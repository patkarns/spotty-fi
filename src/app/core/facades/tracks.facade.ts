import { Injectable } from '@angular/core';

import { Dictionary } from 'lodash';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getArtistsById, getCountsPerArtistId, getIsLoading, getIsLoaded, getTracks, getCount, getSearchOffset, getPageCount, getPageSize } from '../state/tracks/tracks.selector';
import * as TracksActions from '../state/tracks';
import { Track } from '../../shared/interfaces/state/track-interface';
import { SpotifyObject } from '../../shared/interfaces/state/spotify-object.interface';

@Injectable({
    providedIn: 'root'
})
export class TracksFacade {
    isLoading$: Observable<boolean> = this.store.select(getIsLoading);
    isLoaded$: Observable<boolean> = this.store.select(getIsLoaded);
    tracks$: Observable<Track[]> = this.store.select(getTracks);
    count$: Observable<number> = this.store.select(getCount);
    pageCount$: Observable<number> = this.store.select(getPageCount);
    pageSize$: Observable<number> = this.store.select(getPageSize);

    searchOffset$: Observable<number> = this.store.select(getSearchOffset);
    artistCounts$: Observable<{ [key: string]: number }> = this.store.select(getCountsPerArtistId);
    artistsById$: Observable< Dictionary<SpotifyObject>> = this.store.select(getArtistsById);

    constructor(private store: Store) {
    }

    getUserSavedTracks = () => this.store.dispatch(TracksActions.getUserSavedTracks());
    updateSearchOffset = (searchOffset: number) => this.store.dispatch(TracksActions.updateSearchOffset({ searchOffset }));
    searchTracksByGenre = (genre: string) => this.store.dispatch(TracksActions.searchTracksByGenre({ genre }));
}