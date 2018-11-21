import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { HttpService } from "../http.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: "app-show-profile",
  templateUrl: "./show-profile.component.html",
  styleUrls: ["./show-profile.component.css"]
})
export class ShowProfileComponent implements OnInit {
  @Input() childShowProfile: any;
  @Output() updateUserProfileAfterEdit = new EventEmitter();
  userId: string;
  editToPass: object;
  id: string;
  user: object;
  profileToPass: object;
  auctionsWatchedToPass: object;
  auctionsCreatedToPass: object;
  walletToPass: object;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    // this.showWallet();
    this.getId();
    this.user = {
      auctions_created: [],
      auctions_watched: []
    };
    this.userId = sessionStorage.getItem("userId");
  }
  getId() {
    this._route.params.subscribe(params => {
      this.id = params["id"];
      this.getUser(this.id);
    });
  }
  getUser(id) {
    let obs = this._httpService.getUserById(id);
    obs.subscribe(res => {
      this.user = res["data"][0];
      this.profileToPass = this.user;
      this.walletToPass = this.user;
      this.auctionsWatchedToPass = this.user;
    });
  }

  editProfile() {
    let obs = this._httpService.getUserById(this.userId);
    obs.subscribe(res => {
      this.editToPass = res["data"][0];
      this.auctionsCreatedToPass = null;
      this.auctionsWatchedToPass = null;
    });
  }

  closeEditProfile($event) {
    this.editToPass = null;
    this.updateUserProfile($event);
  }

  updateUserProfile($event) {
    this.updateUserProfileAfterEdit.emit(false);
  }
  showAuctionsWatched() {
    this.auctionsWatchedToPass = this.user;
    this.auctionsCreatedToPass = null;
    this.editToPass = null;
  }
  showAuctionsCreated() {
    this.auctionsWatchedToPass = null;
    this.auctionsCreatedToPass = this.user;
    this.editToPass = null;
  }
  // showWallet() {
  // }
}
