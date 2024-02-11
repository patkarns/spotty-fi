import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { first } from 'lodash';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Album, AlbumType } from '../../shared/interfaces/state/track-interface';
import { AuthService } from './auth.service';
import { SpotifyObjectApiResponse } from '../../shared/interfaces/api-responses.interface';
import { LoginFacade } from '../facades/login.facade';

interface AlbumApiResponse extends SpotifyObjectApiResponse {
  images: {
    url: string;
  }[];
}

interface AlbumApiResponse extends SpotifyObjectApiResponse {
  // popularity: number
  genres: string[];
  album_type: AlbumType;
  release_date: string;
}

interface SearchAlbumsByIdsResponse {
  albums: AlbumApiResponse[];
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class AlbumsService {
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private loginFacade: LoginFacade
  ) {}

  searchAlbumsByIds(albumIds: string[]): Observable<Album[]> {
    return this.authService.retrieveToken().pipe(
      switchMap(({ accessToken, isTokenExpired }) => {
        if (isTokenExpired) {
          this.loginFacade.setIsLoggedIn(false);
          return of([]);
        }

        let headers = new HttpHeaders();
        headers = headers.set('Authorization', `Bearer ${accessToken}`);
        const url = `/v1/albums?ids=${albumIds.join(',')}`;

        return this.http.get<SearchAlbumsByIdsResponse>(url, { headers }).pipe(
          map((response) => {
            const albums = response.albums.map(
              (album) =>
                ({
                  name: album.name,
                  genres: album.genres,
                  albumType: album.album_type,
                  releaseDate: album.release_date,
                  id: album.id,
                  uri: album.uri,
                  type: AlbumType[album.album_type],
                  imageUrl: first(album.images)?.url,
                } as Album)
            );

            return albums;
          })
        );
      })
    );
  }
}
