import { Track } from "../../../shared/interfaces/state/track-interface";

export interface Tracks {
  isLoading: boolean;
  isLoaded: boolean;
  tracks: Track[];
  count: number;
  pageSize: number;
  searchOffset: number;
}




