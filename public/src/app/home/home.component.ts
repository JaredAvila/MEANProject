import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: Array<any> = []
  constructor() {
    
  }
  
  ngOnInit() {
    $('document').ready(function () {
      $("#catClick").on('click', function(){
        $("#side").animate({height: '400px'}, 1000);
      });
      $("#hideBtn").on('click', function(){
        $("#side").animate({height: '20px'}, 1000);
      });
    });
    this.items = [
      { name: 'assets/img/car1.jpeg' },
      { name: 'assets/img/car2.jpeg' },
      { name: 'assets/img/car3.jpeg' },
      { name: 'assets/img/car1.jpeg' },
      { name: 'assets/img/car2.jpeg' },
      { name: 'assets/img/car3.jpeg' },
      { name: 'assets/img/car1.jpeg' },
      { name: 'assets/img/car2.jpeg' },
      { name: 'assets/img/car3.jpeg' }
    ]
  }
  
}
