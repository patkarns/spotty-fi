import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { State } from './core.state';
import * as LoginReducer from './login/login.reducer';
import * as TracksReducer from './tracks/tracks.reducer';
import * as GenreReducer from './genre/genre.reducer';
import * as PlaybackReducer from './playback/playback.reducer';

export const reducers: ActionReducerMap<State> = {
  login: LoginReducer.reducer,
  tracks: TracksReducer.reducer,
  genre: GenreReducer.reducer,
  playback: PlaybackReducer.reducer
};

export const metaReducers: MetaReducer<State>[] = [];