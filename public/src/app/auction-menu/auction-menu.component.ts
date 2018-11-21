import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-auction-menu',
  templateUrl: './auction-menu.component.html',
  styleUrls: ['./auction-menu.component.css']
})
export class AuctionMenuComponent implements OnInit {
  @Output() anEventEmitter = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  openMenu() {
    this.anEventEmitter.emit(false);
  }
}
