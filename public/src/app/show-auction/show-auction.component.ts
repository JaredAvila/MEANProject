import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-auction',
  templateUrl: './show-auction.component.html',
  styleUrls: ['./show-auction.component.css']
})
export class ShowAuctionComponent implements OnInit {
  auctionId: string;
  auction: object;
  newBid: object;
  similarAuctions: Array<object> = [];
  isMenuVisible: boolean = false;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute, 
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.auctionId = params['id'];
      this.getAuctionById()
    })
    this.auction = {}
    this.newBid = {
      auction_id: "",
      bidder_id: "",
      amount: ""
    }
  }

  getAuctionById() {
    let obs = this._httpService.getAuctionById(this.auctionId);
    obs.subscribe(res => {
      if (res['errors']) {
        console.log(res['errors']);
      } else {
        this.auction = res['data'];
        console.log(this.auction);
        this.getCategoryByAuctionId(this.auction['_id']);
      }
    })
  }

  getCategoryByAuctionId(auctionId) {
    let obs = this._httpService.getCategoryByAuctionId(auctionId)
    obs.subscribe(res => {
      this.similarAuctions = res['data']['auctions'];
      console.log("similar auctions", this.similarAuctions);
    })
  }

  createBid() {
    // temp
    this.newBid = {
      "auction_id": "5bf37a0106616623c843336f",
      "bidder_id": sessionStorage.getItem('userId'),
      "bidder_name": sessionStorage.getItem('userFirsttName'),
      "amount": 999
    }
    console.log(this.newBid);
    let obs = this._httpService.createBid(this.newBid);
    obs.subscribe(res => {
      if (res['errors']) {
        console.log(res['errors']);
      } else {
        this.auction = res['data'];
      }
    })
  }

  dataFromChild(eventData) {
    this.isMenuVisible = eventData;
  }
}