
import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { TracksService } from '../../services/tracks.service';
import * as TracksActions from './tracks.actions';

@Injectable()
export class TracksEffects {
  constructor(private actions$: Actions<any>, private authService: AuthService, private tracksService: TracksService) {}

  getUserSavedTracks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TracksActions.getUserSavedTracks.type),
      switchMap(() =>
        this.tracksService.getUserSavedTracks().pipe(
          map(({ tracks, count}) => TracksActions.getUserSavedTracksSuccess({ tracks, count })),
          catchError((error) =>
            of(TracksActions.getUserSavedTracksFailed({ error }))
          )
        )
      )
    )
  );

}