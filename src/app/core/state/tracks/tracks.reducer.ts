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
    loaded: false
  })),
  on(TracksActions.getUserSavedTracksSuccess, (state, { tracks, count }) => ({
    ...state,
    tracks,
    count,
    isLoading: false,
    loaded: true
  })),
  on(TracksActions.getUserSavedTracksFailed, (state, { error }) => ({
    ...state,
    tracks: [],
    count: 0,
    isLoading: false,
    loaded: false
  }))
);

export function reducer(state: Tracks | undefined, action: Action) {
  return tracksReducer(state, action);
}