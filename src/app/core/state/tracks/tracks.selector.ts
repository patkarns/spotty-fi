import { countBy, flatMap, forEach, forOwn, head, keyBy, groupBy, mapValues, method, size, uniqBy } from 'lodash' 
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

export const getCount = createSelector(
  getTracksState,
  (state: Tracks) => state.count
);

export const getPageCount = createSelector(
  getTracksState,
  (state: Tracks) => state.count/state.pageSize
);

export const getPageSize = createSelector(
  getTracksState,
  (state: Tracks) => state.pageSize
);

export const getSearchOffset = createSelector(
  getTracksState,
  (state: Tracks) => state.searchOffset
);

export const getArtistsById = createSelector(
  getTracksState,
  (state: Tracks) => {
    const allArtists = flatMap(state.tracks, (track) => track.artists);
    const uniqueArtists = uniqBy(allArtists, a => a.id);
    return keyBy(uniqueArtists, 'id'); 
  }
)

export const getCountsPerArtistId = createSelector(
  getTracksState,
  (state: Tracks) => {
    const allArtists = flatMap(state.tracks, (track) => track.artists);
    const groupedArtist = groupBy(allArtists, 'id');
    return mapValues(groupedArtist, (value) => size(value));
  }
);

