import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSliderModule } from '@angular/material/slider';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

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
import { PlaybackService } from '../../services/playback.service';
import { SpotifyObject, Track } from '../../state/tracks';
import { GenreFacade } from '../../facades/genre.facade';
import { getAvailableGenres } from '../../state/genre';
import { FormsModule } from '@angular/forms';

const defaultGenres = ["acoustic", "afrobeat", "alt-rock", "alternative", "ambient", "anime", "black-metal", "bluegrass", "blues", "bossanova", "brazil", "breakbeat", "british", "cantopop", "chicago-house", "children", "chill", "classical", "club", "comedy", "country", "dance", "dancehall", "death-metal", "deep-house", "detroit-techno", "disco", "disney", "drum-and-bass", "dub", "dubstep", "edm", "electro", "electronic", "emo", "folk", "forro", "french", "funk", "garage", "german", "gospel", "goth", "grindcore", "groove", "grunge", "guitar", "happy", "hard-rock", "hardcore", "hardstyle", "heavy-metal", "hip-hop", "holidays", "honky-tonk", "house", "idm", "indian", "indie", "indie-pop", "industrial", "iranian", "j-dance", "j-idol", "j-pop", "j-rock", "jazz", "k-pop", "kids", "latin", "latino", "malay", "mandopop", "metal", "metal-misc", "metalcore", "minimal-techno", "movies", "mpb", "new-age", "new-release", "opera", "pagode", "party", "philippines-opm", "piano", "pop", "pop-film", "post-dubstep", "power-pop", "progressive-house", "psych-rock", "punk", "punk-rock", "r-n-b", "rainy-day", "reggae", "reggaeton", "road-trip", "rock", "rock-n-roll", "rockabilly", "romance", "sad", "salsa", "samba", "sertanejo", "show-tunes", "singer-songwriter", "ska", "sleep", "songwriter", "soul", "soundtracks", "spanish", "study", "summer", "swedish", "synth-pop", "tango", "techno", "trance", "trip-hop", "turkish", "work-out", "world-music"];

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
    MatFormFieldModule,
    MatInputModule,
    MatIconModule
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
  public selectedGenre: string | null = null;
  public searchQuery: string = '';
  // public selectedGenres: { [key: string]: boolean} = {};
  // public selectedGenres: Map<string, boolean> = new Map();
  public popularGenresItems$: Observable<{ name: string; color: string }[]> =
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
        if (!keys(artistsById).length) {
          const res = defaultGenres.slice(0, pageCount).map(genre => ({
            name: genre,
            color: this.chipColors.greenLightest
          })) as { name: string; color: string }[];
          return of(res);
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
                  ? this.chipColors.greenLight
                  : this.chipColors.greenLightest,
            }));
          })
        );
      })
    );
  }

  // public onSearchBarUpdate(query: string) {
  //   this.searchQuery = query;
  // }
  // public searchTracksByGenres() {
  //   //  const genres = _map(filter(toPairs(this.selectedGenres), last), first);
  //   this.tracksFacade.searchTracksByGenres(this.searchQuery, this.selectedGenre!);
  // }

  public handleGenreToggle(genreName: string) {
    this.selectedGenre = (this.selectedGenre === genreName) ? null : genreName;
    if (this.selectedGenre) this.tracksFacade.searchTracksByGenre(this.selectedGenre);

  }

  // public genreSelected(genreName: string) {
  //   this.selectedGenre = this.selectedGenre === genreName ? null : genreName;
  //   const selectedGenreState = this.selectedGenres.has(genreName) ? !this.selectedGenres.get(genreName) : true;
  //   this.selectedGenres.set(genreName, selectedGenreState);
  // }
}
