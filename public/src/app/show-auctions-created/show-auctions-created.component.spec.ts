import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAuctionsCreatedComponent } from './show-auctions-created.component';

describe('ShowAuctionsCreatedComponent', () => {
  let component: ShowAuctionsCreatedComponent;
  let fixture: ComponentFixture<ShowAuctionsCreatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAuctionsCreatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAuctionsCreatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
