import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  sortBy,
  toPairs,
  map as _map,
  keys,
  countBy,
  last,
  mean,
} from 'lodash';
import {
  combineLatest,
  switchMap,
  Observable,
  of,
  map,
} from 'rxjs';

import { TracksFacade } from '../../facades/tracks.facade';
import { GenreFacade } from '../../facades/genre.facade';
import { PlaybackFacade } from '../../facades/playback.facade';
import { PlaylistsFacade } from '../../facades/playlists.facade';
import { PlaylistsComponent } from '../playlists/playlists.component';
import { TracksDetailsComponent } from '../tracks-details/tracks-details.component';

@Component({
  selector: 'app-tracks-display',
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
    MatExpansionModule,
    BrowserAnimationsModule,
    PlaylistsComponent,
    TracksDetailsComponent
  ],
  templateUrl: './tracks-display.component.html',
  styleUrl: './tracks-display.component.scss',
})
export class TracksDisplayComponent implements OnInit {
  public tracksSearchOffsetValue: number = 0;
  private chipColors = {
    greenLightest: '#f9fcf5',
    greenLighter: '#eef6e2',
    greenLight: '#d7ebba',
    green: '#c6e29c'
  };
  public selectedGenre: string | null = null;
  public popularGenresItems$: Observable<{ name: string; color: string }[]> =
    of([]);
  public panelExpandedState: { [key: string]: boolean } = {
    myPlaylists: false,
    browseTracks: false
  }

  constructor(
    public playbackFacade: PlaybackFacade,
    public playlistsFacade: PlaylistsFacade,
    public tracksFacade: TracksFacade,
    private genreFacade: GenreFacade
  ) {}

  public ngOnInit(): void {
    this.popularGenresItems$ = combineLatest([
      this.tracksFacade.artistsById$,
      this.tracksFacade.pageCount$,
    ]).pipe(
      switchMap(([artistsById, pageCount]) => {
        if (!keys(artistsById).length) {
          return of([]);
        }
        this.genreFacade.getGenresByArtistIds(
          keys(artistsById).slice(0, pageCount)
        );
        return this.genreFacade.availableGenres$.pipe(
          map((availableGenres) => {
            const genreByCount = countBy(availableGenres);
            const topGenreCountsSorted = sortBy(toPairs(genreByCount), 1)
              .reverse()
              .slice(0, 10);
            const counts = _map(topGenreCountsSorted, last) as number[];
            const meanCount = mean(counts);
            return topGenreCountsSorted.map(([name, count]) => ({
              name,
              color:
                count > meanCount
                  ? this.chipColors.green
                  : this.chipColors.greenLighter,
            }));
          })
        );
      })
    );
  }

  public handleGenreToggle(genreName: string) {
    // different behaviors based on whether the chip is selected/unselected
    this.selectedGenre = (this.selectedGenre === genreName) ? null : genreName;
    if (this.selectedGenre) this.tracksFacade.searchTracksByGenre(this.selectedGenre);
  }

  public confirmAddTracksToPlaylist() {
    this.playlistsFacade.addTracksToPlaylist();
  }
}
