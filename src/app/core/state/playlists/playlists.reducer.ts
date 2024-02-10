import { Action, createReducer, on } from '@ngrx/store';

import { chain } from 'lodash';

import * as PlaylistActions from './playlists.actions';
import { Playlists } from './playlists.interface';
import { initialState } from './playlists.state';

export const playlistsReducer = createReducer(
  initialState,
  on(PlaylistActions.getUserPlaylists, (state) => ({
    ...state,
    availablePlaylists: [],
    count: 0,
    isLoading: true,
    loaded: false
  })),
  on(PlaylistActions.getUserPlaylistsSuccess, (state, { availablePlaylists, count }) => ({
    ...state,
    availablePlaylistsById: chain(availablePlaylists).keyBy('id').value(),
    count,
    isLoading: false,
    loaded: true
  })),
  on(PlaylistActions.getUserPlaylistsFailed, (state, { error }) => ({
    ...state,
    availablePlaylists: [],
    count: 0,
    isLoading: false,
    loaded: false
  })),
  on(PlaylistActions.getPlaylistTracksByPlaylistId, (state) => ({
    ...state,
    playlistTracks: [],
    isLoading: true,
    loaded: false
  })),
  on(PlaylistActions.getPlaylistTracksByPlaylistIdSuccess, (state, { playlistTracks, count }) => ({
    ...state,
    playlistTracksById: chain(playlistTracks).keyBy('id').value(),
    isLoading: false,
    loaded: true
  })),
  on(PlaylistActions.getPlaylistTracksByPlaylistIdFailed, (state, { error }) => ({
    ...state,
    playlistTracks: [],
    isLoading: false,
    loaded: false
  }))
);

export function reducer(state: Playlists | undefined, action: Action) {
  return playlistsReducer(state, action);
}