import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { MainContentComponent } from './core/layout/main-content/main-content.component';
import { reducers, metaReducers } from './core/state';
import { LoginEffects } from './core/state/login';
import { TracksEffects } from './core/state/tracks';

@NgModule({
  imports: [
    BrowserModule,
    EffectsModule.forRoot([LoginEffects, TracksEffects]),
    HeaderComponent,
    HttpClientModule,
    MainContentComponent,
    RouterOutlet,
    StoreModule.forRoot(reducers, {
      metaReducers,
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
