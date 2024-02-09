import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { TracksFacade } from '../../facades/tracks.facade';

import { TracksService } from '../../services/tracks.service';
import * as TracksActions from './tracks.actions';

@Injectable()
export class TracksEffects {
  constructor(
    private actions$: Actions<any>,
    private tracksService: TracksService,
    private tracksFacade: TracksFacade
  ) {}

  getUserSavedTracks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        TracksActions.getUserSavedTracks.type,
        TracksActions.updateSearchOffset.type
      ),
      withLatestFrom(
        this.tracksFacade.pageSize$,
        this.tracksFacade.searchOffset$
      ),
      switchMap(([, pageSize, searchOffset]) =>
        this.tracksService
          .getUserSavedTracks(pageSize, searchOffset * pageSize)
          .pipe(
            map(({ tracks, count }) =>
              TracksActions.getUserSavedTracksSuccess({ tracks, count })
            ),
            catchError((error) =>
              of(TracksActions.getUserSavedTracksFailed({ error }))
            )
          )
      )
    )
  );

  searchTracksByGenre$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TracksActions.searchTracksByGenre.type),
      withLatestFrom(
        this.tracksFacade.pageSize$,
        this.tracksFacade.searchOffset$
      ),
      switchMap(([action, pageSize, searchOffset]) =>
        this.tracksService
          .searchTracksByGenre(pageSize, searchOffset * pageSize, action.genre)
          .pipe(
            map(({ tracks, count }) =>
              TracksActions.getUserSavedTracksSuccess({ tracks, count })
            ),
            catchError((error) =>
              of(TracksActions.getUserSavedTracksFailed({ error }))
            )
          )
      )
    )
  );
}
