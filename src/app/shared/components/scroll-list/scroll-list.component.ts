import { Component, Input } from '@angular/core';
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

import { Output, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ListItem } from '../../../core/models/list-item.model';

@Component({
  selector: 'app-scroll-list',
  standalone: true,
  imports: [    CommonModule,
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
    ScrollListComponent],
  templateUrl: './scroll-list.component.html',
  styleUrl: './scroll-list.component.scss'
})
export class ScrollListComponent {
  @Input() widthRem = 30;
  @Input() heightRem = 20;
  @Input() listItems$: Observable<ListItem[]> = of([]);
  @Input() enableDelete = false;

  public scrollListItemColor: { [key: number]: string } = {
    0: '#f9fcf5',
    1: '#ffffff'
  }

  @Output() listItemClickEvent = new EventEmitter<string>();
  @Output() listItemDeleteEvent = new EventEmitter<string>();
}
