import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Playback } from './playback.interface';

export const getPlaybackState = createFeatureSelector<Playback>('playback');

export const getIsLoading = createSelector(
  getPlaybackState,
  (state: Playback) => state.isLoading
);

export const getIsLoaded = createSelector(
  getPlaybackState,
  (state: Playback) => state.isLoaded
);

export const getQueue = createSelector(
  getPlaybackState,
  (state: Playback) => state.queue
);
