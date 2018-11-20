import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionMenuComponent } from './auction-menu.component';

describe('AuctionMenuComponent', () => {
  let component: AuctionMenuComponent;
  let fixture: ComponentFixture<AuctionMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
