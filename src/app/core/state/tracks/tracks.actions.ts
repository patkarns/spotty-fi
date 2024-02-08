import { createAction, props } from "@ngrx/store";

import { Track } from "./tracks.interface";

export enum TracksActionType {
  GET_USER_SAVED_TRACKS = '[TRACKS] Get User Saved Tracks',
  GET_USER_SAVED_TRACKS_SUCCESS = '[TRACKS] Get User Saved Tracks Success',
  GET_USER_SAVED_TRACKS_FAILED = '[TRACKS] Get User Saved Tracks Failed'
}

export const getUserSavedTracks = createAction(
  TracksActionType.GET_USER_SAVED_TRACKS
);

export const getUserSavedTracksSuccess = createAction(
  TracksActionType.GET_USER_SAVED_TRACKS_SUCCESS,
  props<{ tracks: Track[], count: number }>()
);

export const getUserSavedTracksFailed = createAction(
  TracksActionType.GET_USER_SAVED_TRACKS_FAILED,
  props<{ error: unknown }>()
);


