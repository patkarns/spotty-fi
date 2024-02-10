import { Genre } from './genre';
import { Login } from './login';
import { Playback } from './playback';
import { Playlists } from './playlists';
import { Tracks } from './tracks';

export interface State {
  login: Login;
  tracks: Tracks;
  genre: Genre;
  playback: Playback,
  playlists: Playlists
}