import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAuctionsWatchedComponent } from './show-auctions-watched.component';

describe('ShowAuctionsWatchedComponent', () => {
  let component: ShowAuctionsWatchedComponent;
  let fixture: ComponentFixture<ShowAuctionsWatchedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAuctionsWatchedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAuctionsWatchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
