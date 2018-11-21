import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { HttpService } from "../http.service";
import * as $ from "jquery";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  user: object;

  constructor(private _httpService: HttpService, private _router: Router) {}

  ngOnInit() {
    this.user = {};
    $("document").ready(function() {
      $(".button").click(function() {
        $(".button").animate({ width: "72px" }, 150);
        $(".button").html("<div class='loader'></div>");
      });
    });
  }

  loginUser() {
    let obs = this._httpService.loginUser(this.user);
    obs.subscribe(res => {
      console.log(res);
      if (res["data"]) {
        sessionStorage.setItem("userId", res["data"]["userId"]);
        sessionStorage.setItem("userFirstName", res["data"]["firstName"]);
        this._router.navigate(["/home"]);
      } else {
        console.log("login error");
      }
    });
  }
}
