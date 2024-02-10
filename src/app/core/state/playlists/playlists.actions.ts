import { createAction, props } from '@ngrx/store';
import { Track } from '../tracks';

import { Playlist } from './playlists.interface';

export enum PlaylistActionType {
  GET_USER_PLAYLISTS = '[PLAYLISTS] Get User Playlists',
  GET_USER_PLAYLISTS_SUCCESS = '[PLAYLISTS] Get User Playlists Success',
  GET_USER_PLAYLISTS_FAILED = '[PLAYLISTS] Get User Playlists Failed',
  GET_PLAYLIST_TRACKS_BY_PLAYLIST_ID= '[PLAYLISTS] Get Playlist Tracks By Playlist Id',
  GET_PLAYLIST_TRACKS_BY_PLAYLIST_ID_SUCCESS = '[PLAYLISTS] Get Playlists Tracks By Playlist Id Success',
  GET_PLAYLIST_TRACKS_BY_PLAYLIST_ID_FAILED = '[PLAYLISTS] Get Playlists Tracks By Playlist Id Failed',
  ADD_TRACKS_TO_PLAYLIST = '[ADD_TRACKS_TO_PLAYLIST] Add Tracks to Playlist',
  ADD_TRACKS_TO_PLAYLIST_SUCCESS = '[ADD_TRACKS_TO_PLAYLIST] Add Tracks to Playlist Success',
  ADD_TRACKS_TO_PLAYLIST_FAILED = '[ADD_TRACKS_TO_PLAYLIST] Add Tracks to Playlist Failed'
}

export const getUserPlaylists = createAction(
  PlaylistActionType.GET_USER_PLAYLISTS
);

export const getUserPlaylistsSuccess = createAction(
  PlaylistActionType.GET_USER_PLAYLISTS_SUCCESS,
  props<{ availablePlaylists: Playlist[], count: number }>()
);

export const getUserPlaylistsFailed = createAction(
  PlaylistActionType.GET_USER_PLAYLISTS_FAILED,
  props<{ error: unknown }>()
);

export const getPlaylistTracksByPlaylistId = createAction(
  PlaylistActionType.GET_PLAYLIST_TRACKS_BY_PLAYLIST_ID,
  props<{ playlistId: string }>()
);

export const getPlaylistTracksByPlaylistIdSuccess = createAction(
  PlaylistActionType.GET_PLAYLIST_TRACKS_BY_PLAYLIST_ID_SUCCESS,
  props<{ playlistTracks: Track[], count: number }>()
);

export const getPlaylistTracksByPlaylistIdFailed = createAction(
  PlaylistActionType.GET_PLAYLIST_TRACKS_BY_PLAYLIST_ID_FAILED,
  props<{ error: unknown }>()
);

export const addTracksToPlaylist = createAction(
  PlaylistActionType.ADD_TRACKS_TO_PLAYLIST,
  props<{ playlistId: string, trackUris: string[] }>()
);

export const addTracksToPlaylistSuccess = createAction(
  PlaylistActionType.ADD_TRACKS_TO_PLAYLIST_SUCCESS,
  props<{ snapshotId: string }>()
);

export const addTracksToPlaylistFailed = createAction(
  PlaylistActionType.ADD_TRACKS_TO_PLAYLIST_FAILED,
  props<{ error: unknown }>()
);