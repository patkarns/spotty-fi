export interface Tracks {
  isLoading: boolean;
  isLoaded: boolean;
  tracks: Track[];
  count: number;
  pageSize: number;
  searchOffset: number;
}

export interface Track extends SpotifyObject {
  popularity: number;  
  addedAt?: string;
  artists: SpotifyObject[];
  album: SpotifyObject;
}

export interface Album extends SpotifyObject {
  genres: string[],
  albumType: AlbumType,
  releaseDate: string,
}

export interface SpotifyObject {
  name: string;
  id: string;
  uri: string;
  type: SpotifyObjectType;
  imageUrl?: string;
  genres?: string[]
}

export enum AlbumType {
  Album, 
  Single,
  Compilation
  // Album = "album", 
  // Single = "single",
  // Compilation = "compilation"
}

export enum SpotifyObjectType {
  Artist = 'artist',
  Track = 'track',
  Album = 'album'
}

