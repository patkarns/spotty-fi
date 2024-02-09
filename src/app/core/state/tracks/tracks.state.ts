import { Tracks } from './tracks.interface';

export const initialState: Tracks = {
  isLoading: false,
  isLoaded: false,
  tracks: [],
  count: 0,
  searchOffset: 0,
  pageSize: 50
};
