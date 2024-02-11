import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { first } from 'lodash';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { LoginFacade } from '../facades/login.facade';
import { TrackApiResponse} from '../../shared/interfaces/api-responses.interface';
import { Track } from '../../shared/interfaces/state/track-interface';
import { SpotifyObject } from '../../shared/interfaces/state/spotify-object.interface';

interface UserQueueApiResponse {
  currently_playing: TrackApiResponse;
  queue: TrackApiResponse[];
}

@Injectable({
  providedIn: 'root',
})
export class PlaybackService {
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private loginFacade: LoginFacade
  ) {}

  public addToPlaybackQueue(trackUri: string): Observable<string> {
    return this.authService.retrieveToken().pipe(
      switchMap(({ accessToken, isTokenExpired }) => {
        if (isTokenExpired) {
          this.loginFacade.setIsLoggedIn(false);
          return of('');
        }

        let headers = new HttpHeaders();
        headers = headers.set('Authorization', `Bearer ${accessToken}`);
        const url = `https://api.spotify.com/v1/me/player/queue?uri=${trackUri}`;
        return this.http
          .post<string>(url, null, { headers })
          .pipe(map((response) => response));
      })
    );
  }

  public getUserQueue(): Observable<Track[]> {
    return this.authService.retrieveToken().pipe(
      switchMap(({ accessToken, isTokenExpired }) => {
        if (isTokenExpired) {
          this.loginFacade.setIsLoggedIn(false);
          return of([]);
        }

        const url = 'https://api.spotify.com/v1/me/player/queue';
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', `Bearer ${accessToken}`);
        return this.http.get<UserQueueApiResponse>(url, { headers }).pipe(
          map((response) => {
            return response.queue.map(
              (item) =>
                ({
                  name: item.name,
                  id: item.id,
                  popularity: item.popularity,
                  imageUrl: first(item.album.images)?.url,
                  uri: item.uri,
                  type: item.type,
                  album: {
                    name: item.album.name,
                    id: item.album.id,
                    uri: item.album.uri,
                  } as SpotifyObject,
                  artists: item.artists.map(
                    (artistResponse) =>
                      ({
                        name: artistResponse.name,
                        id: artistResponse.id,
                        uri: artistResponse.uri,
                        type: artistResponse.type,
                      } as SpotifyObject)
                  ),
                } as Track)
            );
          })
        );
      })
    );
  }

  public transferPlaybackToDevice(deviceId: string): void {
    this.authService
      .retrieveToken()
      .subscribe(({ accessToken, isTokenExpired }) => {
        if (isTokenExpired) {
          this.loginFacade.setIsLoggedIn(false);
        }

        let headers = new HttpHeaders();
        headers = headers.set('Authorization', `Bearer ${accessToken}`);
        const url = `https://api.spotify.com/v1/me/player`;
        this.http
          .put<string>(url, { device_ids: [deviceId] }, { headers })
          .subscribe();
      });
  }
}
