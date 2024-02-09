import { Track } from "../tracks";

export interface Playback {
  isLoading: boolean;
  isLoaded: boolean;
  queue: Track[];
}



