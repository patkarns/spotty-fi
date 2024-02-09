import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import { PlaybackService } from '../../services/playback.service';
import * as PlaybackActions from './playback.actions';

@Injectable()
export class PlaybackEffects {
  constructor(
    private actions$: Actions<any>,
    private playbackService: PlaybackService
  ) {}

  getGenresByArtistIds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlaybackActions.getUserQueue.type),
      switchMap(() =>
        this.playbackService.getUserQueue().pipe(
          map((queue) => PlaybackActions.getUserQueueSuccess({ queue })),
          catchError((error) =>
            of(PlaybackActions.getUserQueueFailed({ error }))
          )
        )
      )
    )
  );

  addToPlaybackQueue$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlaybackActions.addToPlaybackQueue.type),
      switchMap((action) =>
        this.playbackService.addToPlaybackQueue(action.trackUri).pipe(
          switchMap(() =>
            this.playbackService.getUserQueue().pipe(
              map((queue) => PlaybackActions.getUserQueueSuccess({ queue })),
              catchError((error) =>
                of(PlaybackActions.getUserQueueFailed({ error }))
              )
            )
          )
        )
      )
    )
  );
}
