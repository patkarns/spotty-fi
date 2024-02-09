import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSliderModule } from '@angular/material/slider';

import {
  orderBy,
  sortBy,
  fromPairs,
  toPairs,
  reverse,
  map as _map,
  keys,
  groupBy,
  countBy,
  mapValues,
  size,
  head,
  last,
  mean,
} from 'lodash';
import {
  forkJoin,
  combineLatest,
  take,
  switchMap,
  Observable,
  of,
  map,
} from 'rxjs';

import { TracksFacade } from '../../facades/tracks.facade';
import { PlaybackService } from '../../services/playback.service';
import { SpotifyObject, Track } from '../../state/tracks';
import { GenreFacade } from '../../facades/genre.facade';
import { getAvailableGenres } from '../../state/genre';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tracks-display',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatGridListModule,
    MatRippleModule,
    MatSliderModule,
    FormsModule,
  ],
  templateUrl: './tracks-display.component.html',
  styleUrl: './tracks-display.component.scss',
})
export class TracksDisplayComponent implements OnInit {
  public tracksSearchOffsetValue: number = 0;
  private chipColors = {
    greenLightest: '#d7ebba',
    greenLighter: '#c6e29c',
    greenLight: '#b2d879',
  };
  public trackInfo: Track | null = null;
  public popularGenresItems$: Observable<{ genre: string; color: string }[]> =
    of([]);

  constructor(
    public playbackService: PlaybackService,
    public tracksFacade: TracksFacade,
    private genreFacade: GenreFacade
  ) {}

  public ngOnInit(): void {
    this.popularGenresItems$ = combineLatest([
      this.tracksFacade.artistsById$,
      this.tracksFacade.pageCount$,
    ]).pipe(
      switchMap(([artistsById, pageCount]) => {
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
            return topGenreCountsSorted.map(([genre, count]) => ({
              genre,
              color:
                count > meanCount
                  ? this.chipColors.greenLight
                  : this.chipColors.greenLightest,
            }));
          })
        );
      })
    );
  }
}
