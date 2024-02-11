export enum SpotifyObjectType {
  Artist = 'artist',
  Track = 'track',
  Album = 'album',
  Playlist = 'playlist',
}

export interface SpotifyObject {
  name: string;
  id: string;
  uri: string;
  type: SpotifyObjectType;
  imageUrl?: string;
  genres?: string[];
}
