import { Genre } from './genre';
import { Login } from './login';
import { Tracks } from './tracks';

export interface State {
  login: Login;
  tracks: Tracks;
  genre: Genre;
}