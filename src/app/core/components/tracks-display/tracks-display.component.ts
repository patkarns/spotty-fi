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
  sortBy,
  toPairs,
  map as _map,
  keys,
  countBy,
  last,
  mean
} from 'lodash';
import {
  combineLatest,
  switchMap,
  Observable,
  of,
  map,
} from 'rxjs';

import { TracksFacade } from '../../facades/tracks.facade';
import { Track } from '../../state/tracks';
import { GenreFacade } from '../../facades/genre.facade';
import { PlaybackFacade } from '../../facades/playback.facade';
import { PlaylistsFacade } from '../../facades/playlists.facade';
import { PlaylistsComponent } from '../playlists/playlists.component';

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
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    PlaylistsComponent
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
  public trackInfo: Track | null = null;
  public selectedGenre: string | null = null;
  public searchQuery: string = '';
  public popularGenresItems$: Observable<{ name: string; color: string }[]> =
    of([]);

  constructor(
    public playbackFacade: PlaybackFacade,
    public playlistsFacade: PlaylistsFacade,
    public tracksFacade: TracksFacade,
    private genreFacade: GenreFacade
  ) {}

  public ngOnInit(): void {
    this.tracksFacade.tracks$.subscribe(t => console.log('tracks', t))
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
    this.selectedGenre = (this.selectedGenre === genreName) ? null : genreName;
    if (this.selectedGenre) this.tracksFacade.searchTracksByGenre(this.selectedGenre);
  }
}
