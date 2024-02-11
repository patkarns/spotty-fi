import { SpotifyObject } from "./spotify-object.interface";

export interface Track extends SpotifyObject {
  popularity: number;
  addedAt?: string;
  artists: SpotifyObject[];
  album: SpotifyObject;
}

export interface Album extends SpotifyObject {
  genres: string[];
  albumType: AlbumType;
  releaseDate: string;
}

export enum AlbumType {
  Album,
  Single,
  Compilation,
  // Album = "album",
  // Single = "single",
  // Compilation = "compilation"
}
