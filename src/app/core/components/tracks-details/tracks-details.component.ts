import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

import {
  take
} from 'rxjs';

import { Track } from '../../../shared/interfaces/state/track-interface';
import { TracksFacade } from '../../facades/tracks.facade';
import { PlaybackFacade } from '../../facades/playback.facade';
import { PlaylistsFacade } from '../../facades/playlists.facade';


@Component({
  selector: 'app-tracks-details',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatIconModule, MatRippleModule, MatProgressSpinnerModule],
  templateUrl: './tracks-details.component.html',
  styleUrl: './tracks-details.component.scss'
})
export class TracksDetailsComponent implements OnInit {
  public isAddingToPlaylist: boolean = false;
  public trackInfo: Track | null = null;

  constructor(
    public playbackFacade: PlaybackFacade,
    public playlistsFacade: PlaylistsFacade,
    public tracksFacade: TracksFacade
  ) {}

  public ngOnInit(): void {
    this.playlistsFacade.isAddState$.subscribe(isAddState => {
      this.isAddingToPlaylist = isAddState;
      if (!this.isAddingToPlaylist) {
        this.playlistsFacade.setSelectedTracksById({});
      }

    });
  }

  public handleAddTrackToPlaylist(track: Track): void {
    this.playlistsFacade.selectedTracksById$.pipe(take(1)).subscribe(selectedTracksById => {
      if (selectedTracksById[track.id]) {
        const updatedSelectedTracksByIds = { ...selectedTracksById };
        delete updatedSelectedTracksByIds[track.id];
        this.playlistsFacade.setSelectedTracksById(updatedSelectedTracksByIds);
      }  else {
        this.playlistsFacade.setSelectedTracksById({ ...selectedTracksById, [track.id]: track })
      }
    })
  }

}
