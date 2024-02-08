import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PlaybackService {
  constructor(private authService: AuthService, private http: HttpClient) {}

  addToPlaybackQueue(trackUri: string): void {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}` )
    const url = `https://api.spotify.com/v1/me/player/queue?uri=${trackUri}`;
    this.http.post(url, null, { headers }).subscribe();
  }
}
