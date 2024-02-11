import { createAction, props } from "@ngrx/store";

import { Track } from "../../../shared/interfaces/state/track-interface";

export enum PlaybackActionType {
  GET_USER_QUEUE = '[PLAYBACK] Get User Queue',
  GET_USER_QUEUE_SUCCESS = '[PLAYBACK] Get User Queue Success',
  GET_USER_QUEUE_FAILED = '[PLAYBACK] Get User Queue Failed',
  ADD_TO_PLAYBACK_QUEUE = '[PLAYBACK] Add to Playback Queue',
  ADD_TO_PLAYBACK_QUEUE_SUCCESS = '[PLAYBACK] Add to Playback Queue Success',
  ADD_TO_PLAYBACK_QUEUE_FAILED = '[PLAYBACK] Add to Playback Queue Failed',
}

export const addToPlaybackQueue = createAction(
  PlaybackActionType.ADD_TO_PLAYBACK_QUEUE,
  props<{ trackUri: string }>()
);

export const addToPlaybackQueueSuccess = createAction(
  PlaybackActionType.ADD_TO_PLAYBACK_QUEUE_SUCCESS
);

export const addToPlaybackQueueFailed = createAction(
  PlaybackActionType.ADD_TO_PLAYBACK_QUEUE_FAILED
);

export const getUserQueue = createAction(
  PlaybackActionType.GET_USER_QUEUE
);

export const getUserQueueSuccess = createAction(
  PlaybackActionType.GET_USER_QUEUE_SUCCESS,
  props<{ queue: Track[] }>()
);

export const getUserQueueFailed = createAction(
  PlaybackActionType.GET_USER_QUEUE_FAILED,
  props<{ error: unknown }>()
);
