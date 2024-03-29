import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getQueue, getIsLoading, getIsLoaded } from '../state/playback/playback.selector';
import * as PlaybackActions from '../state/playback/playback.actions';
import { Track } from '../../shared/interfaces/state/track-interface';

@Injectable({
    providedIn: 'root'
})
export class PlaybackFacade {
    isLoading$: Observable<boolean> = this.store.select(getIsLoading);
    isLoaded$: Observable<boolean> = this.store.select(getIsLoaded);
    queue$: Observable<Track[]> = this.store.select(getQueue);

    constructor(private store: Store) {
    }

    getUserQueue = () => this.store.dispatch(PlaybackActions.getUserQueue());
    addToPlaybackQueue = (trackUri: string) => this.store.dispatch(PlaybackActions.addToPlaybackQueue( { trackUri } ));
}