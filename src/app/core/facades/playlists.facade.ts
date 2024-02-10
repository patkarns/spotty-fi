import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getAvailablePlaylists, getAvailablePlaylistsById, getPlaylistTracks, getPlaylistTracksById, getIsLoading, getIsLoaded, getCount, getSearchOffset, getPageCount, getPageSize } from '../state/playlists/playlists.selector';
import * as PlaylistsActions from '../state/playlists';
import { Playlist } from '../state/playlists';
import { Track } from '../state/tracks';

@Injectable({
    providedIn: 'root'
})
export class PlaylistsFacade {
    isLoading$: Observable<boolean> = this.store.select(getIsLoading);
    isLoaded$: Observable<boolean> = this.store.select(getIsLoaded);
    availablePlaylists$: Observable<Playlist[]> = this.store.select(getAvailablePlaylists);
    availablePlaylistsById$: Observable<{ [key: string]: Playlist }> = this.store.select(getAvailablePlaylistsById);
    playlistTracks$: Observable<Track[]> = this.store.select(getPlaylistTracks);
    playlistTracksById$: Observable<{ [key: string]: Track }> = this.store.select(getPlaylistTracksById);
    count$: Observable<number> = this.store.select(getCount);
    pageCount$: Observable<number> = this.store.select(getPageCount);
    pageSize$: Observable<number> = this.store.select(getPageSize);
    searchOffset$: Observable<number> = this.store.select(getSearchOffset);

    constructor(private store: Store) {}

    getUserPlaylists = () => this.store.dispatch(PlaylistsActions.getUserPlaylists());
    getPlaylistTracksByPlaylistId = (playlistId: string) => this.store.dispatch(PlaylistsActions.getPlaylistTracksByPlaylistId( {playlistId }));
}