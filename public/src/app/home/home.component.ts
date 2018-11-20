import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: Array<any> = []
  auctions: Array<object> = []
  
  constructor(private _httpService: HttpService) {
  }
  
  ngOnInit() {
    $('document').ready(function () {
      $("#catClick").on('click', function(){
        $("#side").animate({height: '400px'}, 500);
      });
      $("#hideBtn").on('click', function(){
        $("#side").animate({height: '20px'}, 500);
      });
    });

  //carousel imgages-------------------------------------------
    this.items = [
      { name: 'assets/img/prod1.jpeg' },
      { name: 'assets/img/prod2.jpeg' },
      { name: 'assets/img/prod3.jpeg' },
      { name: 'assets/img/prod4.jpeg' },
      { name: 'assets/img/prod5.jpeg' },
      { name: 'assets/img/prod6.jpeg' },
      { name: 'assets/img/prod7.jpeg' },
      { name: 'assets/img/prod1.jpeg' },
      { name: 'assets/img/prod2.jpeg' },
      { name: 'assets/img/prod3.jpeg' },
      { name: 'assets/img/prod4.jpeg' },
      { name: 'assets/img/prod5.jpeg' },
      { name: 'assets/img/prod6.jpeg' },
      { name: 'assets/img/prod7.jpeg' }
    ]
  this.getAllAuctions();
  }

  getAllAuctions() {
    let obs = this._httpService.getAllAuctions()
    obs.subscribe(res => {
      if (res['errors']) {
        console.log("error");
      } else {
        this.auctions = res['data'];
        console.log(this.auctions)
      }
    })
  }
}
