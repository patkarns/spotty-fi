import { Playlists } from './playlists.interface';

export const initialState: Playlists = {
  isLoading: false,
  isLoaded: false,
  availablePlaylistsById: {},
  playlistTracksById: {},
  count: 0,
  pageSize: 50,
  searchOffset: 0
}