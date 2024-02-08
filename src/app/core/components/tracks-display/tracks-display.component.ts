import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';

import { TracksFacade } from '../../facades/tracks.facade';
import { PlaybackService } from '../../services/playback.service';

@Component({
  selector: 'app-tracks-display',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatGridListModule, MatRippleModule],
  templateUrl: './tracks-display.component.html',
  styleUrl: './tracks-display.component.scss'
})
export class TracksDisplayComponent {
  constructor(public playbackService: PlaybackService, public tracksFacade: TracksFacade) {
    tracksFacade.tracks$.subscribe(t => console.log('tracks', t))
  }
}
