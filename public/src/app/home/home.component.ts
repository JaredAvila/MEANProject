import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";
import { Subscription } from "rxjs";
import * as $ from "jquery";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  items: Array<any> = [];
  constructor(private router: Router) {}

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
  }
}
