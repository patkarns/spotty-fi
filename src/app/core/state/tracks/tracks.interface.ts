export interface Tracks {
  isLoading: boolean;
  isLoaded: boolean;
  tracks: Track[];
  count: number;
}

export interface Track {
  name: string;
  id: string;
  popularity: number;
  imageUrl: string;
  uri: string;
  addedAt?: string;
}
