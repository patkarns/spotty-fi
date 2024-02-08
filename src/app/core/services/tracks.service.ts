import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Track } from '../state/tracks';
import { AuthService } from './auth.service';

interface AlbumApiResponse {
  uri: string,
  name: string,
  id: string,
  images: {
    url: string;
  }[]
}

interface ArtistApiResponse {
  uri: string,
  name: string,
  id: string,
}

interface TrackApiResponse {
  uri: string,
  name: string,
  id: string,
  artists: ArtistApiResponse[],
  album: AlbumApiResponse,
  popularity: number
}

interface SavedTrackItem {
  added_at: string,
  track: TrackApiResponse
}

interface UserSavedTracksApiResponse {
  items: SavedTrackItem[]
  total: number;
}


@Injectable({
  providedIn: 'root'
})
export class TracksService {
  constructor(private authService: AuthService, private http: HttpClient) {}

  getUserSavedTracks(): Observable<{ tracks: Track[], count: number}> {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}` )
    const getUserSavedTracksUrl = '/v1/me/tracks';
    
    return (
      this.http.get<UserSavedTracksApiResponse>(getUserSavedTracksUrl, { headers }).pipe(
        map(response => {
          const count = response.total;

          const tracks: Track[] = response.items.map(item => ({
            name: item.track.name,
            id: item.track.id,
            popularity: item.track.popularity,
            imageUrl: item.track.album.images.length ? item.track.album.images[0].url : '',
            uri: item.track.uri
          } as Track));
  
        return { tracks, count };
        })
      )
    );    
  }
}
