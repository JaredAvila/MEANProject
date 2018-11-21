import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-show-auctions-created',
  templateUrl: './show-auctions-created.component.html',
  styleUrls: ['./show-auctions-created.component.css']
})
export class ShowAuctionsCreatedComponent implements OnInit {
  @Input() childAuctionsCreated: any;
  constructor() { }

  ngOnInit() {
  }

}
