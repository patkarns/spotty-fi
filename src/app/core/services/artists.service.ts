import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { SpotifyObject } from '../../shared/interfaces/state/spotify-object.interface';
import { AuthService } from './auth.service';
import { SpotifyObjectApiResponse } from '../../shared/interfaces/api-responses.interface';
import { LoginFacade } from '../facades/login.facade';

interface ArtistApiResponse extends SpotifyObjectApiResponse {
  // popularity: number
  genres: string[];
}

interface SearchArtistsByIdsResponse {
  artists: ArtistApiResponse[];
}

@Injectable({
  providedIn: 'root',
})
export class ArtistsService {
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private loginFacade: LoginFacade
  ) {}

  searchArtistsByIds(artistIds: string[]): Observable<SpotifyObject[]> {
    return this.authService.retrieveToken().pipe(
      switchMap(({ accessToken, isTokenExpired }) => {
        if (isTokenExpired) {
          this.loginFacade.setIsLoggedIn(false);
          return of([]);
        }

        let headers = new HttpHeaders();
        headers = headers.set('Authorization', `Bearer ${accessToken}`);
        const url = `/v1/artists?ids=${artistIds.join(',')}`; // TODO: pagination

        return this.http.get<SearchArtistsByIdsResponse>(url, { headers }).pipe(
          map((response) => {
            const artists = response.artists.map(
              (artist) =>
                ({
                  name: artist.name,
                  genres: artist.genres,
                  id: artist.id,
                  uri: artist.uri,
                } as SpotifyObject)
            );

            return artists;
          })
        );
      })
    );
  }
}
