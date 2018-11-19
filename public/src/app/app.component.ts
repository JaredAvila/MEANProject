import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  constructor() { }
  title = 'Look jQuery Animation working in action!';
  ngOnInit() {
    $('document').ready(function () {
      $("#SearchIcon").on('click', function () {
        $("#closeX").toggle();
        $("#hourGlass").toggle();
        $("#searchBar").toggle(100);
        $("#burgerMenu").toggle(300, "swing");
      })
      $('#burgerMenu').on('click', function () {
        $("#nav-bar-lower").toggle(300);
      });
      $('.lines').on('mouseover', function () {
        $(this).animate({ borderBottom: '1px solid black' }, "swing")
      })
    });
  }
  logoutUser() {
    sessionStorage.clear();
  }


//------------------------------NAVIGATION BAR--------------------------------------------------
  //hamburger menu onClick animation
  hBurgerChange1 = 'bar1'
  hBurgerChange2 = 'bar2'
  hBurgerChange3 = 'bar3'

  hBurgerMenu() {
    if (this.hBurgerChange1 === 'bar1') {
      this.hBurgerChange1 = 'bar1 change'
      this.hBurgerChange2 = 'bar2 change'
      this.hBurgerChange3 = 'bar3 change'
    } else {
      this.hBurgerChange1 = 'bar1'
      this.hBurgerChange2 = 'bar2'
      this.hBurgerChange3 = 'bar3'
    }
  }
  //search bar hide/show
} 