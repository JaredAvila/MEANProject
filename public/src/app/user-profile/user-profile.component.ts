import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service'; 
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  id : string
  user : object
  profileToPass : object
  walletToPass : object
  auctionsWatchedToPass : object
  auctionsCreatedToPass : object


  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getId()
    this.user = {
      auctions_created  : [],
      auctions_watched : []
    }
    this.showProfile()
  }
  getId() {
    this._route.params.subscribe((params) => {
      this.id = params['id'];
      this.getUser(this.id);
    })
  }

  getUser(id) {
    let obs = this._httpService.getUserById(id);
    obs.subscribe(res => {
      this.user = res['data'][0];
      this.profileToPass = this.user
    })
  }

  showProfile() {
    this.profileToPass = this.user
    this.walletToPass = null
    this.auctionsWatchedToPass = null
    this.auctionsCreatedToPass = null
    // this.getUser(this.id)
  }

  showWallet() {
    this.profileToPass = null
    this.walletToPass = this.user
    this.auctionsWatchedToPass = null
    this.auctionsCreatedToPass = null
  }


  showAuctionsWatched() {
    this.profileToPass = null
    this.walletToPass = null
    this.auctionsWatchedToPass = this.user
    this.auctionsCreatedToPass = null
  }

  showAuctionsCreated() {
    this.profileToPass = null
    this.walletToPass = null
    this.auctionsWatchedToPass = null
    this.auctionsCreatedToPass = this.user
  }

  updateUserProfile($event){
    this.getUser(this.id)
  }

}
