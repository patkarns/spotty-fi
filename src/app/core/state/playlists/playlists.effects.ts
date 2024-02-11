import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { map as _map, values } from 'lodash';

import * as PlaylistActions from './playlists.actions';
import { PlaylistsService } from '../../services/playlists.service';
import { PlaylistsFacade } from '../../facades/playlists.facade';

@Injectable()
export class PlaylistEffects {
  constructor(
    private actions$: Actions<any>,
    private playlistsFacade: PlaylistsFacade,
    private playlistsService: PlaylistsService
  ) {}

  searchPlaylistsByGenre$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlaylistActions.getUserPlaylists.type),
      withLatestFrom(
        this.playlistsFacade.pageSize$,
        this.playlistsFacade.searchOffset$
      ),
      switchMap(([, pageSize, searchOffset]) =>
        this.playlistsService
          .getUserPlaylists(pageSize, searchOffset * pageSize)
          .pipe(
            map(({ availablePlaylists, count }) =>
              PlaylistActions.getUserPlaylistsSuccess({
                availablePlaylists,
                count,
              })
            ),
            catchError((error) =>
              of(PlaylistActions.getUserPlaylistsFailed({ error }))
            )
          )
      )
    )
  );

  getPlaylistTracksByPlaylistId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        PlaylistActions.getPlaylistTracksByPlaylistId.type,
        PlaylistActions.addTracksToPlaylistSuccess.type,
        PlaylistActions.removeTracksFromPlaylist.type
      ),
      switchMap((action) =>
        this.playlistsService
          .getPlaylistTracksByPlaylistId(action.playlistId)
          .pipe(
            map(({ playlistTracks, count }) =>
              PlaylistActions.getPlaylistTracksByPlaylistIdSuccess({
                playlistTracks,
                count,
              })
            ),
            catchError((error) =>
              of(PlaylistActions.getPlaylistTracksByPlaylistIdFailed({ error }))
            )
          )
      )
    )
  );

  addTracksToPlaylist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlaylistActions.addTracksToPlaylist.type),
      withLatestFrom(
        this.playlistsFacade.selectedPlaylistId$,
        this.playlistsFacade.selectedTracksById$
      ),
      switchMap(([, playlistId, selectedTracksById]) =>
        this.playlistsService
          .addTracksToPlaylist(
            playlistId,
            _map(values(selectedTracksById), 'uri')
          )
          .pipe(
            map(() =>
              PlaylistActions.addTracksToPlaylistSuccess({ playlistId })
            ),
            catchError((error) =>
              of(PlaylistActions.addTracksToPlaylistFailed({ error }))
            )
          )
      )
    )
  );

  removeTracksFromPlaylist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlaylistActions.removeTracksFromPlaylist.type),
      withLatestFrom(
        this.playlistsFacade.selectedPlaylistId$,
        this.playlistsFacade.playlistTracksById$,
      ),
      switchMap(([action, playlistId, playlistTracksById]) =>
        this.playlistsService
          .removeTracksFromPlaylist(playlistId, action.trackIds.map((trackId: string) => playlistTracksById[trackId].uri))
          .pipe(
            map(() =>
              PlaylistActions.removeTracksFromPlaylistSuccess({ playlistId })
            ),
            catchError((error) =>
              of(PlaylistActions.removeTracksFromPlaylistFailed({ error }))
            )
          )
      )
    )
  );
}
