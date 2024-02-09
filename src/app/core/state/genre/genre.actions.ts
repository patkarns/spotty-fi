import { createAction, props } from '@ngrx/store';

export enum GenreActionType {
  GET_GENRES_BY_ALBUM_IDS = '[GENRES] Get Genres By Album Ids',
  GET_GENRES_BY_ALBUM_IDS_SUCCESS = '[GENRES] Get Genres By Album Ids Success',
  GET_GENRES_BY_ALBUM_IDS_FAILED = '[GENRES] Get Genres By Album Ids Failed',
  GET_GENRES_BY_ARTIST_IDS = '[GENRES] Get Genres By Artist Ids',
  GET_GENRES_BY_ARTIST_IDS_SUCCESS = '[GENRES] Get Genres By Artist Ids Success',
  GET_GENRES_BY_ARTIST_IDS_FAILED = '[GENRES] Get Genres By Artist Ids Failed'
}

export const getGenresByAlbumIds = createAction(
  GenreActionType.GET_GENRES_BY_ALBUM_IDS,
  props<{ albumIds: string[] }>()
);

export const getGenresByAlbumIdsSuccess = createAction(
  GenreActionType.GET_GENRES_BY_ALBUM_IDS_SUCCESS,
  props<{ availableGenres: string[] }>()
);

export const getGenresByAlbumIdsFailed = createAction(
  GenreActionType.GET_GENRES_BY_ALBUM_IDS_FAILED,
  props<{ error: unknown }>()
);

export const getGenresByArtistIds = createAction(
  GenreActionType.GET_GENRES_BY_ARTIST_IDS,
  props<{ artistIds: string[] }>()
);

export const getGenresByArtistIdsSuccess = createAction(
  GenreActionType.GET_GENRES_BY_ARTIST_IDS_SUCCESS,
  props<{ availableGenres: string[] }>()
);

export const getGenresByArtistIdsFailed = createAction(
  GenreActionType.GET_GENRES_BY_ARTIST_IDS_FAILED,
  props<{ error: unknown }>()
);