import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  @Input() childEditProfile: any;
  @Output() closeEditProfile = new EventEmitter();
  errors: object;
  userId: string;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.userId = sessionStorage.getItem('userId')
    this.errors = {}
  }
  
  updateUserById() {
    let obs = this._httpService.updateUserById(this.userId, this.childEditProfile);
    obs.subscribe(res => {
      if (res['data']['errors']) {
        this.errors = res['data']['errors'];
      } else {
        this.cancelEditProfile()
      }
    })
  }

  cancelEditProfile() {
    this.closeEditProfile.emit(false)
  }

}
