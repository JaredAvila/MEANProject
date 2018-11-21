import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../http.service'

@Component({
  selector: 'app-similar-items',
  templateUrl: './similar-items.component.html',
  styleUrls: ['./similar-items.component.css']
})
export class SimilarItemsComponent implements OnInit {
  @Input() auction: object;
  @Input() similarAuctions: Array<object> = [];
  @Output() anEventEmitter = new EventEmitter();

  constructor(
    private _httpService: HttpService,
  ) { }

  ngOnInit() {
  }

  getCategoryByAuctionId() {
    let obs = this._httpService.getCategoryByAuctionId(this.auction['_id'])
    obs.subscribe(res => {
      this.similarAuctions = res['data']['auctions'];
      console.log("similar auctions", this.similarAuctions);
    })
  }

  openMenu() {
    this.anEventEmitter.emit(true);
  }
}
