import { Component, OnInit } from "@angular/core";
import { HttpService } from "../http.service";
import { Router } from "@angular/router";
import * as $ from "jquery";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.css"]
})
export class RegistrationComponent implements OnInit {
  newUser: object;
  errors: Array<{ type: String }>;
  valid: Boolean = false;
  cont: Boolean = true;
  constructor(private _httpService: HttpService, private _router: Router) {}

  ngOnInit() {
    this.newUser = {};
    this.errors = [];
    // $("document").ready(function() {
    //   $(".button").click(function() {
    //     $(".button").animate({ width: "72px" }, 150);
    //     $(".button").html("<div class='loader'></div>");
    //   });
    // });
  }

  createUser() {
    let obs = this._httpService.createUser(this.newUser);
    obs.subscribe(res => {
      if (res["data"]["errors"]) {
        this.errors = res["data"]["errors"];
        this.valid = true;
        this.cont = false;
        console.log(this.errors["email"].message);
      } else {
        this._router.navigate(["/home"]);
      }
    });
  }
}
