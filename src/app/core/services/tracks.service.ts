import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { first } from 'lodash';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { mapTrackApiResponsesToTrack } from './service-mapper-utils';
import { LoginFacade } from '../facades/login.facade';
import { SavedTracksApiResponse, SearchTracksApiResponse } from '../../shared/interfaces/api-responses.interface';
import { Track } from '../../shared/interfaces/state/track-interface';


@Injectable({
  providedIn: 'root',
})
export class TracksService {
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private loginFacade: LoginFacade
  ) {}

  getUserSavedTracks(
    limit: number,
    offset: number
  ): Observable<{ tracks: Track[]; count: number }> {
    return this.authService.retrieveToken().pipe(
      switchMap(({ accessToken, isTokenExpired }) => {
        if (isTokenExpired) {
          this.loginFacade.setIsLoggedIn(false);
          return of({ tracks: [], count: 0 });
        }

        let headers = new HttpHeaders();
        headers = headers.set('Authorization', `Bearer ${accessToken}`);
        const getUserSavedTracksUrl = `/v1/me/tracks?limit=${limit}&offset=${offset}`;

        return this.http
          .get<SavedTracksApiResponse>(getUserSavedTracksUrl, { headers })
          .pipe(
            map((response) => {
              const count = response.total;
              const tracks: Track[] = response.items.map((item) =>
                mapTrackApiResponsesToTrack(item.track)
              );
              return { tracks, count };
            })
          );
      })
    );
  }

  searchTracksByGenre(
    limit: number,
    offset: number,
    genre: string[]
  ): Observable<{ tracks: Track[]; count: number }> {
    return this.authService.retrieveToken().pipe(
      switchMap(({ accessToken, isTokenExpired }) => {
        if (isTokenExpired) {
          this.loginFacade.setIsLoggedIn(false);
          return of({ tracks: [], count: 0 });
        }
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', `Bearer ${accessToken}`);

        const url = `https://api.spotify.com/v1/search?q=genre:"${genre}"&type=track&limit=${limit}`;

        return this.http.get<SearchTracksApiResponse>(url, { headers }).pipe(
          map((response) => {
            const count = response.tracks.total;
            const tracks = response.tracks.items.map(trackItem => mapTrackApiResponsesToTrack(trackItem));
            return { tracks, count };
          })
        );
      })
    );
  }
}
