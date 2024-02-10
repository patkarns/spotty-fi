import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { first } from 'lodash';
import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { TrackApiResponse } from './tracks.service';
import { SpotifyObject, Track } from '../state/tracks';
import { Observable } from 'rxjs';


interface UserQueueApiResponse {
  currently_playing: TrackApiResponse,
  queue: TrackApiResponse[]
}

@Injectable({
  providedIn: 'root'
})
export class PlaybackService {
  constructor(private authService: AuthService, private http: HttpClient) {}

  public addToPlaybackQueue(trackUri: string): Observable<string> {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}` )
    const url = `https://api.spotify.com/v1/me/player/queue?uri=${trackUri}`;
    return this.http.post<string>(url, null, { headers }).pipe(map(response => response));
  }

  public getUserQueue(): Observable<Track[]> {
    const url = 'https://api.spotify.com/v1/me/player/queue';
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}` )
    return this.http.get<UserQueueApiResponse>(url, { headers }).pipe(
      map(response => {
        return response.queue.map(item => ({
          name: item.name,
          id: item.id,
          popularity: item.popularity,
          imageUrl: first(item.album.images)?.url,
          uri: item.uri,
          type: item.type,
          album: {
            name: item.album.name,
            id: item.album.id,
            uri: item.album.uri
          } as SpotifyObject,
          artists: item.artists.map(artistResponse => ({
            name: artistResponse.name,
            id: artistResponse.id,
            uri: artistResponse.uri,
            type: artistResponse.type
          } as SpotifyObject))
        } as Track));
      })
    );    
  }

  public transferPlaybackToDevice(deviceId: string): void {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}` )
    const url = `https://api.spotify.com/v1/me/player`;
    this.http.put<string>(url, { device_ids: [deviceId]}, { headers }).subscribe();
  }
}
