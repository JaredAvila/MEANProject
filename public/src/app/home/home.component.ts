import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { filter } from "rxjs/operators";
import * as $ from "jquery";
import { HttpService } from "../http.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router, 
    private _route: ActivatedRoute,
    private _httpService: HttpService) {}

  items: Array<any> = [];
  auctions: Array<object> = [];

  ngOnInit() {
    //--------Causes auto-scroll to top of page upon loading of new component.------------------------------
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => window.scrollTo(0, 0));

    // Menu jQuery------------------------------------------------------------------
    $("document").ready(function() {
      $("#catClick").on("click", function() {
        $("#side").animate({ height: "400px" }, 500);
      });
      $("#hideBtn").on("click", function() {
        $("#side").animate({ height: "20px" }, 500);
      });
    });

    //carousel imgages-------------------------------------------
    this.items = [
      { name: "assets/img/prod1.jpeg" },
      { name: "assets/img/prod2.jpeg" },
      { name: "assets/img/prod3.jpeg" },
      { name: "assets/img/prod4.jpeg" },
      { name: "assets/img/prod5.jpeg" },
      { name: "assets/img/prod6.jpeg" },
      { name: "assets/img/prod7.jpeg" },
      { name: "assets/img/prod1.jpeg" },
      { name: "assets/img/prod2.jpeg" },
      { name: "assets/img/prod3.jpeg" },
      { name: "assets/img/prod4.jpeg" },
      { name: "assets/img/prod5.jpeg" },
      { name: "assets/img/prod6.jpeg" },
      { name: "assets/img/prod7.jpeg" }
    ];
    // this.getAllAuctions();
    this.getIdFromUrl();
  }
  
  getIdFromUrl() {
    this._route.params.subscribe(params => {
      if (params['categoryName']) {
        this.getAuctionsByCategoryName(params['categoryName']);
        console.log("INIT", params['categoryName']);
        
      } else {
        this.getAllAuctions();
      }
    })
  }

  getAllAuctions() {
    let obs = this._httpService.getAllAuctions();
    obs.subscribe(res => {
      if (res["errors"]) {
        console.log("error");
      } else {
        this.auctions = res["data"];
        console.log(this.auctions);
      }
    });
  }
  getAuctionsByCategoryName(categoryName) {
    let obs = this._httpService.getAuctionsByCategoryName(categoryName)
    obs.subscribe(res => {
      console.log(res);
      this.auctions = res['data']['auctions'];
    })
  }
}
