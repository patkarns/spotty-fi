import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Login } from './login.interface';

export const getLoginState = createFeatureSelector<Login>('login');

export const getLoading = createSelector(
  getLoginState,
  (state: Login) => state.isLoading
);

export const getIsLoggedIn = createSelector(
  getLoginState,
  (state: Login) => state.isLoggedIn
);
