import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"]
})
export class UserProfileComponent implements OnInit {
  user : object
  profileToPass : object
  walletToPass : object
  auctionsWatchedToPass : object
  auctionsCreatedToPass : object
  userId: string;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this.userId = sessionStorage.getItem("userId");
    if (this.userId) {
      this.user = {
        auctions_created: [],
        auctions_watched: []
      };
      this.showProfile();
      this.getUser();
    } else {
      this._router.navigate(["/login"]);
    }
  }

  getUser() {
    let obs = this._httpService.getUserById(this.userId);
    obs.subscribe(res => {
      this.user = res["data"][0];
      this.profileToPass = this.user;
    });
  }

  showProfile() {
    this.profileToPass = this.user;
    this.walletToPass = null;
    this.auctionsWatchedToPass = null;
    this.auctionsCreatedToPass = null;
  }

  updateUserProfile($event) {
    this.getUser();
  }
}
