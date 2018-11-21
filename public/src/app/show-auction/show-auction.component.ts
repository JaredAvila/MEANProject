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

      this.newBid = {
        "auction_id": this.auctionId,
        "bidder_id": sessionStorage.getItem('userId'),
        "bidder_name": sessionStorage.getItem('userFirstName')
      }

    })
    this.auction = {}
  }

  getAuctionById() {
    let obs = this._httpService.getAuctionById(this.auctionId);
    obs.subscribe(res => {
      if (res['errors']) {
        console.log(res['errors']);
      } else {
        this.auction = res['data'];
        console.log("specific auction", this.auction['_id'], this.auction);
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
    console.log(this.newBid);
    let obs = this._httpService.createBid(this.newBid);
    obs.subscribe(res => {
      console.log('created bid', res);
      if (res['errors']) {
        console.log(res['errors']);
      } else {
        // this.auction = res['data']['auction'];
        this.getAuctionById();
      }
    })
  }

  dataFromChild(eventData) {
    this.isMenuVisible = eventData;
  }
}