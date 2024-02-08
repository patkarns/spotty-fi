import { Injectable } from '@angular/core';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getLoading, getIsLoggedIn } from '../state/login';
import * as LoginActions from '../state/login';

@Injectable({
    providedIn: 'root'
})
export class LoginFacade {
    isLoading$: Observable<boolean> = this.store.select(getLoading);
    isLoggedIn$: Observable<boolean> = this.store.select(getIsLoggedIn);

    constructor(private store: Store) {
    }

    getLoginCredentials = () => this.store.dispatch(LoginActions.getLoginCredentials());
    logOut = () => this.store.dispatch(LoginActions.logout());
}