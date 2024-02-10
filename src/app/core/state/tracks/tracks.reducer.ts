import { Action, createReducer, on } from '@ngrx/store';

import * as TracksActions from './tracks.actions';
import { Tracks } from './tracks.interface';
import { initialState } from './tracks.state';

export const tracksReducer = createReducer(
  initialState,
  on(TracksActions.getUserSavedTracks, (state) => ({
    ...state,
    tracks: [],
    count: 0,
    isLoading: true,
    isLoaded: false
  })),
  on(TracksActions.getUserSavedTracksSuccess, (state, { tracks, count }) => ({
    ...state,
    tracks,
    count,
    isLoading: false,
    isLoaded: true
  })),
  on(TracksActions.getUserSavedTracksFailed, (state, { error }) => ({
    ...state,
    tracks: [],
    count: 0,
    isLoading: false,
    isLoaded: false
  })),
  on(TracksActions.updateSearchOffset, (state, { searchOffset }) => ({
    ...state,
    tracks: [],
    searchOffset,
    isLoading: true,
    isLoaded: false
  }))
);

export function reducer(state: Tracks | undefined, action: Action) {
  return tracksReducer(state, action);
}