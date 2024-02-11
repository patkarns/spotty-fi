import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';

import {
  Observable,
  of,
  map,
  take
} from 'rxjs';

import { PlaylistsFacade } from '../../facades/playlists.facade';
import { Playlist } from '../../../shared/interfaces/state/playlist-interface';
import { ScrollListComponent } from '../../../shared/components/scroll-list/scroll-list.component';
import { ListItem } from '../../../shared/interfaces/list-item.interface';
import { TracksFacade } from '../../facades/tracks.facade';

@Component({
  selector: 'app-playlists',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    ScrollListComponent,
    MatSlideToggleModule,
  ],
  templateUrl: './playlists.component.html',
  styleUrl: './playlists.component.scss',
})
export class PlaylistsComponent implements OnInit {
  public selectedPlaylist: Playlist | null = null;
  public playlistListItems$: Observable<ListItem[]> = of([]);
  public playlistTrackListItems$: Observable<ListItem[]> = of([]);
  public isAddingToPlaylist: boolean = false;
  private playlistsById: { [key: string]: Playlist } = {};
  // private playlistTracksById: { [key: string]: Track } = {}; For deleting tracks from playlist (will be supported later)

  constructor(
    public playlistsFacade: PlaylistsFacade,
    private tracksFacade: TracksFacade
  ) {}
  public ngOnInit(): void {
    this.playlistListItems$ = this.playlistsFacade.availablePlaylists$.pipe(
      map((availablePlaylists) =>
        availablePlaylists.map(
          (availablePlaylist) =>
            ({
              mainText: availablePlaylist.name,
              subtitleText:
                availablePlaylist.owner.displayName ||
                availablePlaylist.owner.id,
              id: availablePlaylist.id,
            } as ListItem)
        )
      )
    );

    this.playlistTrackListItems$ = this.playlistsFacade.playlistTracks$.pipe(
      map((playlistTracks) =>
        playlistTracks.map(
          (playlistTrack) =>
            ({
              mainText: playlistTrack.name,
              subtitleText: playlistTrack.artists[0].name,
              id: playlistTrack.id,
              imageUrl: playlistTrack.imageUrl,
            } as ListItem)
        )
      )
    );

    this.playlistsFacade.availablePlaylistsById$.subscribe(
      (availablePlaylistsById) => (this.playlistsById = availablePlaylistsById)
    );
    // this.playlistsFacade.playlistTracksById$.subscribe(playlistTracksById => this.playlistTracksById = playlistTracksById);
  }

  public selectPlaylist(playlistId: string): void {
    this.playlistsFacade.getPlaylistTracksByPlaylistId(playlistId);
    this.playlistsFacade.setSelectedPlaylistId(playlistId);
    this.selectedPlaylist = this.playlistsById[playlistId];
  }

  public handleDeleteTrackFromPlaylist(trackId: string): void {
    this.playlistsFacade.removeTracksFromPlaylist([trackId]);
  }

  public handleIsAddStateChange(e: MatSlideToggleChange): void {
    this.playlistsFacade.setIsAddState(e.checked);
    if (e.checked) {
      this.tracksFacade.isLoaded$.pipe(take(1)).subscribe((isLoaded) => {
        if (!isLoaded) this.tracksFacade.getUserSavedTracks();
      });
    }
  }
}
