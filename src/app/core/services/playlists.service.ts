import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';
import {
  SearchTracksApiResponse,
  SpotifyObjectApiResponse,
  TrackApiResponse,
} from '../services/tracks.service';
import { Playlist, PlaylistOwner } from '../state/playlists';
import { mapTrackApiResponsesToTrack } from './service-mapper-utils';
import { Track } from '../state/tracks';
import { first, isArguments } from 'lodash';

interface PlaylistItemResponse extends SpotifyObjectApiResponse {
  tracks: {
    href: string;
    total: number;
  };
  public: boolean;
  description: string;
  owner: PlaylistOwnerResponse;
  images: {
    url: string;
  }[];
}

interface PlaylistOwnerResponse {
  id: string;
  displayName?: string;
}

interface GetUserPlaylistsResponse {
  total: number;
  items: PlaylistItemResponse[];
}

interface GetPlaylistResponse extends SpotifyObjectApiResponse {
  public: boolean;
  description: string;
  owner: PlaylistOwnerResponse;
  tracks: {
    total: number;
    items: {
      track: TrackApiResponse;
    }[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class PlaylistsService {
  constructor(private authService: AuthService, private http: HttpClient) {}

  getUserPlaylists(
    limit: number,
    offset: number
  ): Observable<{ availablePlaylists: Playlist[]; count: number }> {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    const url = `/v1/me/playlists?limit=${limit}&offset=${offset}`;
    return this.http.get<GetUserPlaylistsResponse>(url, { headers }).pipe(
      map((response) => {
        const count = response.total;
        const availablePlaylists = response.items.map(
          (playlistItem) =>
            ({
              name: playlistItem.name,
              id: playlistItem.id,
              uri: playlistItem.uri,
              type: playlistItem.type,
              public: playlistItem.public,
              description: playlistItem.description,
              owner: {
                id: playlistItem.owner.id,
                displayName: playlistItem.owner.displayName,
              } as PlaylistOwner,
              tracks: {
                href: playlistItem.tracks.href,
                total: playlistItem.tracks.total,
              },
              imageUrl: first(playlistItem.images)?.url,
            } as Playlist)
        );

        return { availablePlaylists, count };
      })
    );
  }

  public getPlaylistTracksByPlaylistId(
    playlistId: string
  ): Observable<{ playlistTracks: Track[]; count: number }> {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    const url = `/v1/playlists/${playlistId}`;
    return this.http.get<GetPlaylistResponse>(url, { headers }).pipe(
      map((response) => {
        const count = response.tracks.total;
        const playlistTracks = response.tracks.items.map((trackItem) =>
          mapTrackApiResponsesToTrack(trackItem.track)
        );

        return { playlistTracks, count };
      })
    );
  }

  public addTracksToPlaylist(
    playlistId: string,
    trackUris: string[]
  ): Observable<{ snapshotId: string }> {
    const token = this.authService.getToken();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    const url = `/v1/playlists/${playlistId}`;
    return this.http
      .post<{ snapshot_id: string }>(url, { uris: trackUris }, { headers })
      .pipe(
        map((response) => {
          const snapshotId = response.snapshot_id;

          return { snapshotId };
        })
      );
  }
}
