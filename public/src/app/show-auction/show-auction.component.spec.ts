import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAuctionComponent } from './show-auction.component';

describe('ShowAuctionComponent', () => {
  let component: ShowAuctionComponent;
  let fixture: ComponentFixture<ShowAuctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAuctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
