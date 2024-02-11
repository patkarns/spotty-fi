import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksDetailsComponent } from './tracks-details.component';

describe('TracksDetailsComponent', () => {
  let component: TracksDetailsComponent;
  let fixture: ComponentFixture<TracksDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TracksDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TracksDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
