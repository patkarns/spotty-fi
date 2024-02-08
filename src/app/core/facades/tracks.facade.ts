import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getIsLoading, getIsLoaded, getTracks, Track} from '../state/tracks';
import * as TracksActions from '../state/tracks';

@Injectable({
    providedIn: 'root'
})
export class TracksFacade {
    
    isLoading$: Observable<boolean> = this.store.select(getIsLoading);
    isLoggedIn$: Observable<boolean> = this.store.select(getIsLoaded);
    tracks$: Observable<Track[]> = this.store.select(getTracks);

    constructor(private store: Store) {
    }

    getUserSavedTracks = () => this.store.dispatch(TracksActions.getUserSavedTracks());
}