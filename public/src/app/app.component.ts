import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  // title = 'Look jQuery Animation working in action!';
  userId: string;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute
  ) { }
  
  ngOnInit() {
    //-----------------jQuery--------------------------------------------------
    $('document').ready(function () {
      $("#SearchIcon").on('click', function () {
        $("#closeX").toggle();
        $("#hourGlass").toggle();
        $("#searchBar").toggle(100);
      })
      $('#burgerMenu').on('click', function () {
        $("#nav-bar-lower").toggle(300);
      });
      $('.lines').on('mouseover', function () {
        $(this).animate({ borderBottom: '1px solid black' }, "swing")
      })
      $("#footerCatsHov").on('click', function () {
        $("#footerCats").toggle(200);
      })
    });
    // this.createDefaultCategories();
  }

  createDefaultCategories() {
    let categoryNames = [
      'cars',
      'accessories',
      'tech',
      'toysgames',
      'house',
      'artmusic',
      'bookscomics',
      'shoes',
      'collect'
    ]
    console.log('Creating default categories..');
    for (var name of categoryNames) {
      let obs = this._httpService.createDefaultCategories({name: name});
      obs.subscribe(res => {
        // console.log(res);
      })
    }
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
