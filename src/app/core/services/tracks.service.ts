import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SpotifyObjectType, SpotifyObject, Track } from '../state/tracks';
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

interface TrackApiResponse extends SpotifyObjectApiResponse {
  artists: SpotifyObjectApiResponse[],
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

  getUserSavedTracks(limit: number, offset: number): Observable<{ tracks: Track[], count: number}> {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}` )
    const getUserSavedTracksUrl = `/v1/me/tracks?limit=${limit}&offset=${offset}`;  // TODO: pagination
    
    return (
      this.http.get<UserSavedTracksApiResponse>(getUserSavedTracksUrl, { headers }).pipe(
        map(response => {
          const count = response.total;

          const tracks: Track[] = response.items.map(item => ({
            name: item.track.name,
            id: item.track.id,
            popularity: item.track.popularity,
            imageUrl: item.track.album.images.length ? item.track.album.images[0].url : '',
            uri: item.track.uri,
            addedAt: item.added_at,
            type: item.track.type,
            album: {
              name: item.track.album.name,
              id: item.track.album.id,
              uri: item.track.album.uri
            } as SpotifyObject,
            artists: item.track.artists.map(artistResponse => ({
              name: artistResponse.name,
              id: artistResponse.id,
              uri: artistResponse.uri,
              type: artistResponse.type
            } as SpotifyObject))
          } as Track));
  
        return { tracks, count };
        })
      )
    );    
  }
}
