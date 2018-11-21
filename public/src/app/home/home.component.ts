import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { filter, concatAll } from "rxjs/operators";
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
    private _httpService: HttpService
  ) {}

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
      $("#auctions").on("scroll", function() {
        if (
          $(this).scrollTop() + $(this).innerHeight() >=
          $(this)[0].scrollHeight
        ) {
          console.log("End of div load more auctions");
        }
      });
    });

    //carousel imgages-------------------------------------------
    // this.items = [
    //   { name: "assets/img/prod1.jpeg" },
    //   { name: "assets/img/prod2.jpeg" },
    //   { name: "assets/img/prod3.jpeg" },
    //   { name: "assets/img/prod4.jpeg" },
    //   { name: "assets/img/prod5.jpeg" },
    //   { name: "assets/img/prod6.jpeg" },
    //   { name: "assets/img/prod7.jpeg" },
    //   { name: "assets/img/prod1.jpeg" },
    //   { name: "assets/img/prod2.jpeg" },
    //   { name: "assets/img/prod3.jpeg" },
    //   { name: "assets/img/prod4.jpeg" },
    //   { name: "assets/img/prod5.jpeg" },
    //   { name: "assets/img/prod6.jpeg" },
    //   { name: "assets/img/prod7.jpeg" }
    // ];
    
    this.getIdFromUrl()
  }

  getIdFromUrl() {
    this._route.params.subscribe(params => {
      if (params["categoryName"]) {
        this.getAuctionsByCategoryName(params["categoryName"]);
        console.log("INIT", params["categoryName"]);
      } else {
        this.getAllAuctions();
      }
    });
  }

  getAllAuctions() {
    let obs = this._httpService.getAllAuctions();
    obs.subscribe(res => {
      console.log(res);
      if (res["errors"]) {
        console.log("error");
      } else {
        this.auctions = res["data"];
        this.randomizedCarousel(this.auctions);
        console.log(this.items);
      }
    });
  }

  randomizedCarousel(array) {
    var n = 6, i;
    var idxs = [];

    // While there remain elements to shuffle…
    while (n) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * array.length);
  
      // If not already shuffled, move it to the new array.
      if (!this.contains.call(idxs, i)) {
        idxs.push(i);
        n--;
      }
    }
    this.items = [];
    for (var idx of idxs) {
      this.items.push(array[idx]);
    }
  }

  getAuctionsByCategoryName(categoryName) {
    let obs = this._httpService.getAuctionsByCategoryName(categoryName);
    obs.subscribe(res => {
      this.auctions = res["data"]["auctions"];
      console.log(this.auctions);
      this.randomizedCarousel(this.auctions);
    });
  }

  contains(num) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = num !== num;
    var indexOf;

    if (!findNaN && typeof Array.prototype.indexOf === 'function') {
      indexOf = Array.prototype.indexOf;
    } else {
      indexOf = function (num) {
        var i = -1, index = -1;

        for (i = 0; i < this.length; i++) {
          var item = this[i];

          if ((findNaN && item !== item) || item === num) {
            index = i;
            break;
          }
        }

        return index;
      };
    }

    return indexOf.call(this, num) > -1;
  };
}
