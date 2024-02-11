import { Track } from "../../../shared/interfaces/state/track-interface";

export interface Playback {
  isLoading: boolean;
  isLoaded: boolean;
  queue: Track[];
}



