import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SpotifyObject } from '../state/tracks';
import { AuthService } from './auth.service';
import { SpotifyObjectApiResponse } from '../services/tracks.service';

interface ArtistApiResponse extends SpotifyObjectApiResponse {
  // popularity: number
  genres: string[]
}

interface SearchArtistsByIdsResponse {
  artists: ArtistApiResponse[]
}

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {
  constructor(private authService: AuthService, private http: HttpClient) {}

  searchArtistsByIds(artistIds: string[]): Observable<SpotifyObject[]> {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}` )
    const url = `/v1/artists?ids=${artistIds.join(',')}`;  // TODO: pagination
    
    return (
      this.http.get<SearchArtistsByIdsResponse>(url, { headers }).pipe(
        map(response => {
          const artists = response.artists.map(artist => ({
            name: artist.name,
            genres: artist.genres,
            id: artist.id,
            uri: artist.uri
          }) as SpotifyObject);

        return artists;
        })
      )
    );    
  }
}
