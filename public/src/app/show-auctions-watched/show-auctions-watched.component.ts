import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-show-auctions-watched',
  templateUrl: './show-auctions-watched.component.html',
  styleUrls: ['./show-auctions-watched.component.css']
})
export class ShowAuctionsWatchedComponent implements OnInit {
  @Input() childAuctionsWatched: any;
  constructor() { }

  ngOnInit() {
  }

}
