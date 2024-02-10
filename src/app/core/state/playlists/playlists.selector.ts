import { createFeatureSelector, createSelector } from '@ngrx/store';

import { values } from 'lodash';
import { Playlists } from './playlists.interface';

export const getPlaylistsState = createFeatureSelector<Playlists>('playlists');

export const getAvailablePlaylists = createSelector(
  getPlaylistsState,
  (state: Playlists) => values(state.availablePlaylistsById)
);

export const getAvailablePlaylistsById = createSelector(
  getPlaylistsState,
  (state: Playlists) => state.availablePlaylistsById
);

export const getPlaylistTracks = createSelector(
  getPlaylistsState,
  (state: Playlists) => values(state.playlistTracksById)
);

export const getPlaylistTracksById = createSelector(
  getPlaylistsState,
  (state: Playlists) => state.playlistTracksById
);

export const getIsLoading = createSelector(
  getPlaylistsState,
  (state: Playlists) => state.isLoading
);

export const getIsLoaded = createSelector(
  getPlaylistsState,
  (state: Playlists) => state.isLoaded
);

export const getCount = createSelector(
  getPlaylistsState,
  (state: Playlists) => state.count
);

export const getPageCount = createSelector(
  getPlaylistsState,
  (state: Playlists) => state.count/state.pageSize
);

export const getPageSize = createSelector(
  getPlaylistsState,
  (state: Playlists) => state.pageSize
);

export const getSearchOffset = createSelector(
  getPlaylistsState,
  (state: Playlists) => state.searchOffset
);