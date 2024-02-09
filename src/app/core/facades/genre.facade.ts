import { Injectable } from '@angular/core';

import { Dictionary } from 'lodash';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getAvailableGenres } from '../state/genre/genre.selector';
import * as GenreActions from '../state/genre/genre.actions';



@Injectable({
    providedIn: 'root'
})
export class GenreFacade {
    // isLoading$: Observable<boolean> = this.store.select(getIsLoading);
    // isLoggedIn$: Observable<boolean> = this.store.select(getIsLoaded);
    availableGenres$: Observable<string[]> = this.store.select(getAvailableGenres);

    constructor(private store: Store) {
    }

    getGenresByAlbumIds = (albumIds: string[]) => this.store.dispatch(GenreActions.getGenresByAlbumIds({ albumIds }));
    getGenresByArtistIds = (artistIds: string[]) => this.store.dispatch(GenreActions.getGenresByArtistIds({ artistIds }));
}