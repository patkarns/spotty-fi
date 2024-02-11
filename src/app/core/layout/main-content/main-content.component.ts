import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

import { WebPlaybackComponent } from '../../components/web-playback/web-playback.component';
import { TracksDisplayComponent } from '../../components/tracks-display/tracks-display.component';
import { QueueComponent } from '../../components/queue/queue.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [MatGridListModule, TracksDisplayComponent, WebPlaybackComponent, QueueComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {
}
