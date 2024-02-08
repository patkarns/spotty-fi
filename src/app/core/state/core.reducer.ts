import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { State } from "./core.state";
import * as LoginReducer from "./login/login.reducer";
import * as TracksReducer from "./tracks/tracks.reducer";

export const reducers: ActionReducerMap<State> = {
  login: LoginReducer.reducer,
  tracks: TracksReducer.reducer
};

export const metaReducers: MetaReducer<State>[] = [];