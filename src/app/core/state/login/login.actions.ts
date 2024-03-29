import { createAction, props } from '@ngrx/store';

export enum LoginActionType {
  GET_LOGIN_STATUS = '[LOGIN] Get Login Status',
  GET_LOGIN_STATUS_SUCCESS = '[LOGIN] Get Login Status Success',
  GET_LOGIN_STATUS_FAILED = '[LOGIN] Get Login Status Failed',
  SET_LOGIN_STATUS = '[LOGIN] Set Login Status',
  SET_LOGIN_STATUS_SUCCESS = '[LOGIN] Set Login Status Success',
  SET_LOGIN_STATUS_FAILED = '[LOGIN] Set Login Status Failed',
  LOG_OUT = '[LOGIN] Logout',
}

export const getLoginCredentials = createAction(
  LoginActionType.GET_LOGIN_STATUS
);

export const getLoginCredentialsSuccess = createAction(
  LoginActionType.GET_LOGIN_STATUS_SUCCESS,
  props<{ isLoggedIn: boolean }>()
);

export const getLoginCredentialsFailed = createAction(
  LoginActionType.GET_LOGIN_STATUS_FAILED,
  props<{ error: unknown }>()
);

export const logout = createAction(LoginActionType.LOG_OUT);

export const setIsLoggedIn = createAction(LoginActionType.SET_LOGIN_STATUS,
  props<{ isLoggedIn: boolean }>()
);

// export const setIsLoggedIn = createAction(LoginActionType.SET_LOGIN_STATUS,
//   props<{ isLoggedIn: boolean }>()
// );