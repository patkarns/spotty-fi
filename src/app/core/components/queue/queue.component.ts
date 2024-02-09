import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';

import { PlaybackFacade } from '../../facades/playback.facade';

@Component({
  selector: 'app-queue',
  standalone: true,
  imports: [CommonModule, MatListModule],
  templateUrl: './queue.component.html',
  styleUrl: './queue.component.scss'
})
export class QueueComponent implements OnInit {
  public queueItemColor: { [key: number]: string } = {
    0: '#eef6e2',
    1: '#d7ebba'
  }

  constructor(public playbackFacade: PlaybackFacade) {

  }

  public ngOnInit(): void {
    this.playbackFacade.getUserQueue();
    this.playbackFacade.queue$.subscribe(queue => console.log('queue', queue))
  }

}
