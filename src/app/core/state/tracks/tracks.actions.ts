import { createAction, props } from "@ngrx/store";

import { Track } from "../../../shared/interfaces/state/track-interface";

export enum TracksActionType {
  GET_USER_SAVED_TRACKS = '[TRACKS] Get User Saved Tracks',
  GET_USER_SAVED_TRACKS_SUCCESS = '[TRACKS] Get User Saved Tracks Success',
  GET_USER_SAVED_TRACKS_FAILED = '[TRACKS] Get User Saved Tracks Failed',
  UPDATE_SEARCH_OFFSET = '[TRACKS] Update Search Offset',
  SEARCH_TRACKS_BY_GENRE = '[TRACKS] Search Tracks By Genre'
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

export const updateSearchOffset = createAction(
  TracksActionType.UPDATE_SEARCH_OFFSET,
  props<{ searchOffset: number }>()
);

export const searchTracksByGenre = createAction(
  TracksActionType.SEARCH_TRACKS_BY_GENRE,
  props<{ genre: string }>()
);