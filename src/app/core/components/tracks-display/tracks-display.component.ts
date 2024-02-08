import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';

import { TracksFacade } from '../../facades/tracks.facade';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tracks-display',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatGridListModule],
  templateUrl: './tracks-display.component.html',
  styleUrl: './tracks-display.component.scss'
})
export class TracksDisplayComponent {

  constructor(public tracksFacade: TracksFacade) {
    
  }
}
