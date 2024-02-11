import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { first } from 'lodash';
import {
  map, Observable, of,
} from 'rxjs';

import { PlaybackFacade } from '../../facades/playback.facade';
import { ScrollListComponent } from '../../../shared/components/scroll-list/scroll-list.component';
import { ListItem } from '../../../shared/interfaces/list-item.interface';

@Component({
  selector: 'app-queue',
  standalone: true,
  imports: [CommonModule, ScrollListComponent],
  templateUrl: './queue.component.html',
  styleUrl: './queue.component.scss'
})
export class QueueComponent implements OnInit {
  public queueListItems$: Observable<ListItem[]> = of([]);

  constructor(public playbackFacade: PlaybackFacade) {}

  public ngOnInit(): void {
    this.playbackFacade.getUserQueue();
    this.queueListItems$ = this.playbackFacade.queue$.pipe(
      map(tracksInQueue => tracksInQueue.map(trackInQueue => ({
        mainText: trackInQueue.name,
        subtitleText: first(trackInQueue.artists)?.name,
        id: trackInQueue.id,
        imageUrl: trackInQueue.imageUrl
      }) as ListItem)))
  }

}

