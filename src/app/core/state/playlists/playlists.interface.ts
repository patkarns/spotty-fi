import { Track } from '../../../shared/interfaces/state/track-interface';
import { Playlist } from '../../../shared/interfaces/state/playlist-interface';

export interface Playlists {
    isLoading: boolean;
    isLoaded: boolean;
    availablePlaylistsById: { [key: string]: Playlist }
    count: number;
    pageSize: number;
    searchOffset: number;
    playlistTracksById: { [key: string]: Track },
    selectedTracksById: { [key: string]: Track },
    isAddState: boolean,
    selectedPlaylistId: string
}

