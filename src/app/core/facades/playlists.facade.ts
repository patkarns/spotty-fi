import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  getAvailablePlaylists,
  getAvailablePlaylistsById,
  getPlaylistTracks,
  getPlaylistTracksById,
  getIsAddState,
  getSelectedTracksById,
  getSelectedPlaylistId,
  getIsLoading,
  getIsLoaded,
  getCount,
  getSearchOffset,
  getPageCount,
  getPageSize
} from '../state/playlists/playlists.selector';
import * as PlaylistsActions from '../state/playlists';
import { Playlist } from '../../shared/interfaces/state/playlist-interface';
import { Track } from '../../shared/interfaces/state/track-interface';

@Injectable({
  providedIn: 'root',
})
export class PlaylistsFacade {
  isLoading$: Observable<boolean> = this.store.select(getIsLoading);
  isLoaded$: Observable<boolean> = this.store.select(getIsLoaded);
  availablePlaylists$: Observable<Playlist[]> = this.store.select(
    getAvailablePlaylists
  );
  availablePlaylistsById$: Observable<{ [key: string]: Playlist }> =
    this.store.select(getAvailablePlaylistsById);
  playlistTracks$: Observable<Track[]> = this.store.select(getPlaylistTracks);
  playlistTracksById$: Observable<{ [key: string]: Track }> = this.store.select(
    getPlaylistTracksById
  );
  count$: Observable<number> = this.store.select(getCount);
  pageCount$: Observable<number> = this.store.select(getPageCount);
  pageSize$: Observable<number> = this.store.select(getPageSize);
  searchOffset$: Observable<number> = this.store.select(getSearchOffset);
  isAddState$: Observable<boolean> = this.store.select(getIsAddState);
  selectedPlaylistId$: Observable<string> = this.store.select(
    getSelectedPlaylistId
  );
  selectedTracksById$: Observable<{ [key: string]: Track }> = this.store.select(
    getSelectedTracksById
  );
//   trackIdsToRemove$: Observable<string[]> = this.store.select(getTrackIdsToRemove);

  constructor(private store: Store) {}

  addTracksToPlaylist = () =>
    this.store.dispatch(PlaylistsActions.addTracksToPlaylist());
  removeTracksFromPlaylist = (trackIds: string[]) =>
    this.store.dispatch(PlaylistsActions.removeTracksFromPlaylist({ trackIds }));
  setSelectedPlaylistId = (selectedPlaylistId: string) =>
    this.store.dispatch(
      PlaylistsActions.setSelectedPlaylistId({ selectedPlaylistId })
    );
  setIsAddState = (isAddState: boolean) =>
    this.store.dispatch(PlaylistsActions.setIsAddState({ isAddState }));
  setSelectedTracksById = (selectedTracksById: { [key: string]: Track }) =>
    this.store.dispatch(
      PlaylistsActions.setSelectedTracksById({ selectedTracksById })
    );
  getUserPlaylists = () =>
    this.store.dispatch(PlaylistsActions.getUserPlaylists());
  getPlaylistTracksByPlaylistId = (playlistId: string) =>
    this.store.dispatch(
      PlaylistsActions.getPlaylistTracksByPlaylistId({ playlistId })
    );
}
