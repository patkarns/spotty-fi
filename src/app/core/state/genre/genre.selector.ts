import { countBy, flatMap, forEach, forOwn, head, keyBy, groupBy, mapValues, method, size, uniqBy } from 'lodash' 
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Genre } from './genre.interface';

export const getGenreState = createFeatureSelector<Genre>('genre');

export const getAvailableGenres = createSelector(
  getGenreState,
  (state: Genre) => state.availableGenres
);


