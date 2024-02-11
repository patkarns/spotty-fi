import { SpotifyObject } from "./spotify-object.interface";

export interface Playlist extends SpotifyObject {
  public: boolean;
  tracks: {
      href: string,
      total: number
  }
  description: string;
  owner: PlaylistOwner;
}

export interface PlaylistOwner {
  id: string;
  displayName?: string;
}