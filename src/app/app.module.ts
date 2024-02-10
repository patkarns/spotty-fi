import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { MainContentComponent } from './core/layout/main-content/main-content.component';
import { reducers, metaReducers } from './core/state';
import { LoginEffects } from './core/state/login';
import { TracksEffects } from './core/state/tracks';
import { GenreEffects } from './core/state/genre';
import { PlaybackEffects } from './core/state/playback'
import { PlaylistEffects } from './core/state/playlists';

@NgModule({
  imports: [
    BrowserModule,
    EffectsModule.forRoot([GenreEffects, LoginEffects, PlaybackEffects, TracksEffects, PlaylistEffects]),
    HeaderComponent,
    HttpClientModule,
    MainContentComponent,
    RouterOutlet,
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, 
      name: 'Spotty fi'
    })
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
