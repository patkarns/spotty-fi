
import { Injectable } from '@angular/core';
import { Router } from '@angular/router'

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { switchMap, map, catchError, tap } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import * as LoginActions from './login.actions';

@Injectable()
export class LoginEffects {
  constructor(private actions$: Actions<any>, private authService: AuthService, private router: Router) {}

  getLoginCredentials$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.getLoginCredentials.type),
      switchMap(() =>
        this.authService.retrieveToken().pipe(
          map((isLoggedIn) =>
            LoginActions.getLoginCredentialsSuccess({ isLoggedIn })
          ),
          catchError((error) =>
            of(LoginActions.getLoginCredentialsFailed({ error }))
          )
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginActions.logout.type),
      tap(() => this.authService.logout()),
      tap(() => this.router.navigate(['/'])),
    ),
    { dispatch: false }
  );


}