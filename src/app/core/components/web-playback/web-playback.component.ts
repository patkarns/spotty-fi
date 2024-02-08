import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../services/auth.service';

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
  imports: [CommonModule, MatButtonModule ],
  templateUrl: './web-playback.component.html',
  styleUrls: ['./web-playback.component.scss']
})
export class WebPlaybackComponent implements OnInit {

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

  constructor(private authService: AuthService, private cdr: ChangeDetectorRef) { 
  }

  ngOnInit(): void {
    const token = this.authService.getToken();
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      this.player = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: (cb: any) => { cb(token); },
        volume: 0.5
      });

      this.player.addListener('ready', ({ device_id }: { device_id: string}) => {
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

  previousTrack() {
    this.player.previousTrack();
  }

  togglePlay() {
    this.player.togglePlay();
  }

  nextTrack() {
    this.player.nextTrack();
  }
}