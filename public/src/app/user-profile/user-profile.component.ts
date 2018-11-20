import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service'; 
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  id : string
  user : object
  errors : object
  editUser : object

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getUser()
    this.user = {
      auctions_created  : [],
      auctions_watched : []
    }
    this.errors = {}
    this.editUser = {} 

  }

  getUser() {
    this._route.params.subscribe((params: Params) => {
      this.id = params['id'];
      let obs = this._httpService.getUserById(this.id);
      obs.subscribe(res => {
        this.user = res['data'][0];
      })
    })
  }

  updateUserById() {
    let obs = this._httpService.updateUserById(this.id, this.editUser);
    obs.subscribe(res => {
      if (res['data']['errors']) {
        this.errors = res['data']['errors'];
      } else {
        this._router.navigate(['/user-profile', this.id])
        this.getUser()
      }
    })
  }
}
