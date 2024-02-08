import { Component } from '@angular/core';

import { TracksDisplayComponent } from '../../components/tracks-display/tracks-display.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [TracksDisplayComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.css'
})
export class MainContentComponent {

}
