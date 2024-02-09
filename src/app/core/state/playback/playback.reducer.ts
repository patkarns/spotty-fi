import { Action, createReducer, on } from '@ngrx/store';

import * as PlaybackActions from './playback.actions';
import { Playback } from './playback.interface';
import { initialState } from './playback.state';

export const playbackReducer = createReducer(
  initialState,
  on(PlaybackActions.getUserQueue, (state) => ({
    ...state,
    queue: [],
    count: 0,
    isLoading: true,
    loaded: false
  })),
  on(PlaybackActions.getUserQueueSuccess, (state, { queue }) => ({
    ...state,
    queue,
    isLoading: false,
    loaded: true
  })),
  on(PlaybackActions.getUserQueueFailed, (state, { error }) => ({
    ...state,
    queue: [],
    isLoading: false,
    loaded: false
  }))
);

export function reducer(state: Playback | undefined, action: Action) {
  return playbackReducer(state, action);
}