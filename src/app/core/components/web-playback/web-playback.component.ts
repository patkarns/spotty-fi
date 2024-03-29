import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { take } from 'rxjs';
import { PlaybackFacade } from '../../facades/playback.facade';

import { AuthService } from '../../services/auth.service';
import { PlaybackService } from '../../services/playback.service';

interface Track {
  name: string;
  album: {
    images: { url: string }[];
  };
  artists: { name: string }[];
}

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: () => void;
    spotifyReady: Promise<void>;
    Spotify: any;
  }
}

@Component({
  selector: 'app-web-playback',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule ],
  templateUrl: './web-playback.component.html',
  styleUrls: ['./web-playback.component.scss']
})
export class WebPlaybackComponent implements OnInit {
  public deviceId = '';
  isPaused: boolean = false;
  isActive: boolean = false;
  player: any;
  
  currentTrack: Track = {
    name: "",
    album: {
      images: [{ url: "" }]
    },
    artists: [{ name: "" }]
  };

  constructor(private authService: AuthService, private cdr: ChangeDetectorRef, private playbackService: PlaybackService, private playbackFacade: PlaybackFacade) { 
  }

  ngOnInit(): void {
    this.authService.retrieveToken().pipe(
      take(1)
    ).subscribe(({ accessToken }) => {
      {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        document.body.appendChild(script);
    
        window.onSpotifyWebPlaybackSDKReady = () => {
          this.player = new window.Spotify.Player({
            name: 'Web Playback SDK',
            getOAuthToken: (cb: any) => { cb(accessToken); },
            volume: 0.5
          });
    
          this.player.addListener('ready', ({ device_id }: { device_id: string}) => {
            this.deviceId = device_id;
            console.log('Ready with Device ID', device_id, this.currentTrack);
          });
    
          this.player.addListener('not_ready', ({ device_id }: { device_id: string}) => {
            console.log('Device ID has gone offline', device_id, this.currentTrack);
          });
    
          this.player.addListener('player_state_changed', (state: any) => {
            if (!state) {
              return;
            }
    
            if (this.currentTrack) {
              
              this.currentTrack = state.track_window.current_track;
              this.cdr.detectChanges();
            }
            this.isPaused = state.paused;
    
            this.player.getCurrentState().then((state: any) => {
              this.isActive = !!state;
            });
          });
    
          this.player.connect();
        };
      }
    });
  }

  previousTrack() {
    this.player.previousTrack();
    this.playbackFacade.getUserQueue();
  }

  togglePlay() {
    this.player.togglePlay();
  }

  nextTrack() {
    this.player.nextTrack();
    this.playbackFacade.getUserQueue();
  }

  transferPlaybackToDevice() {
    this.playbackService.transferPlaybackToDevice(this.deviceId);
  }
}