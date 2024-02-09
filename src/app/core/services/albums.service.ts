import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SpotifyObjectType, SpotifyObject, Track, Album, AlbumType } from '../state/tracks';
import { AuthService } from './auth.service';

interface AlbumApiResponse extends SpotifyObjectApiResponse {
  images: {
    url: string;
  }[]
}

interface SpotifyObjectApiResponse {
  uri: string,
  name: string,
  id: string,
  type: SpotifyObjectType
}

interface AlbumApiResponse extends SpotifyObjectApiResponse {
  // popularity: number
  genres: string[],
  album_type: AlbumType,
  release_date: string,
}

interface SearchAlbumsByIdsResponse {
  albums: AlbumApiResponse[]
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  constructor(private authService: AuthService, private http: HttpClient) {}

  searchAlbumsByIds(albumIds: string[]): Observable<Album[]> {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}` )
    const url = `/v1/albums?ids=${albumIds.join(',')}`;  // TODO: pagination
    
    return (
      this.http.get<SearchAlbumsByIdsResponse>(url, { headers }).pipe(
        map(response => {
          const albums = response.albums.map(album => ({
            name: album.name,
            genres: album.genres,
            albumType: album.album_type,
            releaseDate: album.release_date,
            id: album.id,
            uri: album.uri,
            type: AlbumType[album.album_type],
            imageUrl: album.images.length ? album.images[0].url : ''
          }) as Album);

        return albums;
        })
      )
    );    
  }
}
