import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {
  map as _map,
  mean
} from 'lodash';
import {
  Observable,
  of,
  map,
} from 'rxjs';

import { Track } from '../../state/tracks';
import { PlaylistsFacade } from '../../facades/playlists.facade';
import { Playlist } from '../../state/playlists';
import { ScrollListComponent } from '../../../shared/components/scroll-list/scroll-list.component';
import { ListItem } from '../../models/list-item.model';

@Component({
  selector: 'app-playlists',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatChipsModule,
    MatGridListModule,
    MatIconModule,
    MatRippleModule,
    MatSliderModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    ScrollListComponent
  ],
  templateUrl: './playlists.component.html',
  styleUrl: './playlists.component.scss'
})
export class PlaylistsComponent implements OnInit {
  public panelOpenState = false;
  public selectedPlaylist: Playlist | null = null;
  public playlistListItems$: Observable<ListItem[]> = of([]);
  private playlistsById: { [key: string]: Playlist } = {};
  public playlistTrackListItems$: Observable<ListItem[]> = of([]);
  private playlistTracksById: { [key: string]: Track } = {};

  constructor(public playlistsFacade: PlaylistsFacade)  {

  }
  public ngOnInit(): void {
    this.playlistListItems$ = this.playlistsFacade.availablePlaylists$
      .pipe(
        map(availablePlaylists => availablePlaylists.map(availablePlaylist => ({
          mainText: availablePlaylist.name,
          subtitleText: availablePlaylist.owner.displayName || availablePlaylist.owner.id,
          id: availablePlaylist.id
        }) as ListItem))
      );
    
    this.playlistTrackListItems$ = this.playlistsFacade.playlistTracks$.pipe(
      map(playlistTracks => playlistTracks.map(playlistTrack => ({
        mainText: playlistTrack.name,
        subtitleText: playlistTrack.artists[0].name,
        id: playlistTrack.id
      }) as ListItem))
    );
    
    this.playlistsFacade.availablePlaylistsById$.subscribe(availablePlaylistsById => this.playlistsById = availablePlaylistsById);
    this.playlistsFacade.playlistTracksById$.subscribe(playlistTracksById => this.playlistTracksById = playlistTracksById);
  }
  public selectPlaylist(playlistId: string): void {
    this.playlistsFacade.getPlaylistTracksByPlaylistId(playlistId);
    this.selectedPlaylist = this.playlistsById[playlistId];
  }

}
