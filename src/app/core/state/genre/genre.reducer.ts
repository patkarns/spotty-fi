import { Action, createReducer, on } from '@ngrx/store';

import * as GenreActions from './genre.actions';
import { Genre } from './genre.interface';
import { initialState } from './genre.state';

export const tracksReducer = createReducer(
  initialState,
  on(GenreActions.getGenresByAlbumIds, (state) => ({
    ...state,
    availableGenres: [],
    count: 0,
    isLoading: true,
    loaded: false
  })),
  on(GenreActions.getGenresByAlbumIdsSuccess, (state, { availableGenres }) => ({
    ...state,
    availableGenres,
    isLoading: false,
    loaded: true
  })),
  on(GenreActions.getGenresByAlbumIdsFailed, (state, { error }) => ({
    ...state,
    availableGenres: [],
    count: 0,
    isLoading: false,
    loaded: false
  })),
  on(GenreActions.getGenresByArtistIds, (state) => ({
    ...state,
    availableGenres: [],
    count: 0,
    isLoading: true,
    loaded: false
  })),
  on(GenreActions.getGenresByArtistIdsSuccess, (state, { availableGenres }) => ({
    ...state,
    availableGenres,
    isLoading: false,
    loaded: true
  })),
  on(GenreActions.getGenresByArtistIdsFailed, (state, { error }) => ({
    ...state,
    availableGenres: [],
    count: 0,
    isLoading: false,
    loaded: false
  }))
);

export function reducer(state: Genre | undefined, action: Action) {
  return tracksReducer(state, action);
}