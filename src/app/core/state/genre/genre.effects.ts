
import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { flatten, map as _map, omitBy, isUndefined, filter, size } from 'lodash';

import { AlbumsService } from '../../services/albums.service';
import * as GenreActions from './genre.actions';
import { ArtistsService } from '../../services/artists.service';

@Injectable()
export class GenreEffects {
  constructor(private actions$: Actions<any>, private albumsService: AlbumsService, private artistsService: ArtistsService) {}

  getGenresByAlbumIds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GenreActions.getGenresByAlbumIds.type),
      switchMap((action) =>
        this.albumsService.searchAlbumsByIds(action.albumIds).pipe(
          map((albums) => GenreActions.getGenresByAlbumIdsSuccess({ availableGenres: flatten(albums.map(album => album.genres))})),
          catchError((error) =>
            of(GenreActions.getGenresByAlbumIdsFailed({ error }))
          )
        )
      )
    )
  );

  getGenresByArtistIds$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GenreActions.getGenresByArtistIds.type),
      switchMap((action) =>
        this.artistsService.searchArtistsByIds(action.artistIds).pipe(
          map((artists) => GenreActions.getGenresByArtistIdsSuccess({ availableGenres: flatten(_map(artists, 'genres')) as string[] })),
          catchError((error) =>
            of(GenreActions.getGenresByAlbumIdsFailed({ error }))
          )
        )
      )
    )
  );

}