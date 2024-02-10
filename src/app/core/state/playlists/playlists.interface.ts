import { SpotifyObject, Track } from "../tracks";

export interface Playlists {
    isLoading: boolean;
    isLoaded: boolean;
    availablePlaylistsById: { [key: string]: Playlist }
    count: number;
    pageSize: number;
    searchOffset: number;
    playlistTracksById: { [key: string]: Track }
}

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