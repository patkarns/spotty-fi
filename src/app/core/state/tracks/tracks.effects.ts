
import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap, withLatestFrom} from 'rxjs/operators';
import { TracksFacade } from '../../facades/tracks.facade';

import { AuthService } from '../../services/auth.service';
import { TracksService } from '../../services/tracks.service';
import * as TracksActions from './tracks.actions';

@Injectable()
export class TracksEffects {
  constructor(private actions$: Actions<any>, private authService: AuthService, private tracksService: TracksService, private tracksFacade: TracksFacade) {}

  getUserSavedTracks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TracksActions.getUserSavedTracks.type, TracksActions.updateSearchOffset.type),
      withLatestFrom(this.tracksFacade.pageSize$, this.tracksFacade.searchOffset$),
      switchMap(([, pageSize, searchOffset]) =>
        this.tracksService.getUserSavedTracks(pageSize, searchOffset*pageSize).pipe(
          map(({ tracks, count}) => TracksActions.getUserSavedTracksSuccess({ tracks, count })),
          catchError((error) =>
            of(TracksActions.getUserSavedTracksFailed({ error }))
          )
        )
      )
    )
  );

}