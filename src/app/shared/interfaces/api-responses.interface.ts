import { SpotifyObjectType } from "./state/spotify-object.interface";

export interface SpotifyObjectApiResponse {
  uri: string;
  name: string;
  id: string;
  type: SpotifyObjectType;
}

export interface TrackApiResponse extends SpotifyObjectApiResponse {
  artists: SpotifyObjectApiResponse[];
  album: AlbumApiResponse;
  popularity: number;
}

export interface SearchTracksApiResponse {
  tracks: {
    items: TrackApiResponse[];
    total: number;
  };
}

export interface AlbumApiResponse extends SpotifyObjectApiResponse {
  images: {
    url: string;
  }[];
}

export interface SavedTracksApiResponse {
  items: {
    added_at: string;
    track: TrackApiResponse;
  }[];
  total: number;
}
