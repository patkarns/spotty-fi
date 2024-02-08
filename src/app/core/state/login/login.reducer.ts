import { Action, createReducer, on } from "@ngrx/store";

import * as LoginActions from "./login.actions";
import { Login } from './login.interface';
import { initialState } from "./login.state";

export const loginReducer = createReducer(
  initialState,
  on(LoginActions.getLoginCredentials, (state) => ({
    ...state,
    isLoading: true
  })),
  on(LoginActions.getLoginCredentialsSuccess, (state, { isLoggedIn }) => ({
    ...state,
    isLoggedIn,
    isLoading: false
  })),
  on(LoginActions.getLoginCredentialsFailed, (state, { error }) => ({
    ...state,
    isLoggedIn: false,
    isLoading: false
  })),
  on(LoginActions.logout, (state) => ({
    ...state,
    isLoggedIn: false,
    isLoading: false
  })),
);

export function reducer(state: Login | undefined, action: Action) {
  return loginReducer(state, action);
}