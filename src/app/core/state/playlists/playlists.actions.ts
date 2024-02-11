import { createAction, props } from '@ngrx/store';

import { Track } from "../../../shared/interfaces/state/track-interface";
import { Playlist } from "../../../shared/interfaces/state/playlist-interface";

export enum PlaylistActionType {
  GET_USER_PLAYLISTS = '[PLAYLISTS] Get User Playlists',
  GET_USER_PLAYLISTS_SUCCESS = '[PLAYLISTS] Get User Playlists Success',
  GET_USER_PLAYLISTS_FAILED = '[PLAYLISTS] Get User Playlists Failed',
  GET_PLAYLIST_TRACKS_BY_PLAYLIST_ID= '[PLAYLISTS] Get Playlist Tracks By Playlist Id',
  GET_PLAYLIST_TRACKS_BY_PLAYLIST_ID_SUCCESS = '[PLAYLISTS] Get Playlists Tracks By Playlist Id Success',
  GET_PLAYLIST_TRACKS_BY_PLAYLIST_ID_FAILED = '[PLAYLISTS] Get Playlists Tracks By Playlist Id Failed',
  ADD_TRACKS_TO_PLAYLIST = '[PLAYLIST] Add Tracks to Playlist',
  ADD_TRACKS_TO_PLAYLIST_SUCCESS = '[PLAYLIST] Add Tracks to Playlist Success',
  ADD_TRACKS_TO_PLAYLIST_FAILED = '[PLAYLIST] Add Tracks to Playlist Failed',
  REMOVE_TRACKS_FROM_PLAYLIST = '[PLAYLIST] Remove Tracks from Playlist',
  REMOVE_TRACKS_FROM_PLAYLIST_SUCCESS = '[PLAYLIST] Remove Tracks from Playlist Success',
  REMOVE_TRACKS_FROM_PLAYLIST_FAILED = '[PLAYLIST] Remove Tracks from Playlist Failed',
  SET_IS_ADD_MODE = '[PLAYLIST] Set isAdd Mode',
  SET_SELECTED_PLAYLIST_ID = '[PLAYLIST] Set selectedPlaylistId',
  SET_SELECTED_TRACKS_BY_ID = '[PLAYLIST] Set selectedTracksById'
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
  PlaylistActionType.ADD_TRACKS_TO_PLAYLIST
);

export const addTracksToPlaylistSuccess = createAction(
  PlaylistActionType.ADD_TRACKS_TO_PLAYLIST_SUCCESS,
  props<{ playlistId: string }>()
);

export const addTracksToPlaylistFailed = createAction(
  PlaylistActionType.ADD_TRACKS_TO_PLAYLIST_FAILED,
  props<{ error: unknown }>()
);

export const removeTracksFromPlaylist = createAction(
  PlaylistActionType.REMOVE_TRACKS_FROM_PLAYLIST,
  props<{ trackIds: string[] }>()
);

export const removeTracksFromPlaylistSuccess = createAction(
  PlaylistActionType.REMOVE_TRACKS_FROM_PLAYLIST_SUCCESS,
  props<{ playlistId: string }>()
);

export const removeTracksFromPlaylistFailed = createAction(
  PlaylistActionType.REMOVE_TRACKS_FROM_PLAYLIST_FAILED,
  props<{ error: unknown }>()
);

export const setIsAddState = createAction(
  PlaylistActionType.SET_IS_ADD_MODE,
  props<{ isAddState: boolean }>()
);

export const setSelectedTracksById = createAction(
  PlaylistActionType.SET_SELECTED_TRACKS_BY_ID,
  props<{ selectedTracksById: { [key: string]: Track } }>()
);

export const setSelectedPlaylistId = createAction(
  PlaylistActionType.SET_SELECTED_PLAYLIST_ID,
  props<{ selectedPlaylistId: string }>()
);