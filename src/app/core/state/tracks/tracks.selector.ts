import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Tracks } from './tracks.interface';

export const getTracksState = createFeatureSelector<Tracks>('tracks');

export const getIsLoading = createSelector(
  getTracksState,
  (state: Tracks) => state.isLoading
);

export const getIsLoaded = createSelector(
  getTracksState,
  (state: Tracks) => state.isLoaded
);

export const getTracks = createSelector(
  getTracksState,
  (state: Tracks) => state.tracks
);

