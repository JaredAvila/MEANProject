import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../http.service'; 
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.css']
})
export class ShowProfileComponent implements OnInit {
  @Input() childShowProfile: any;
  @Output() updateUserProfileAfterEdit = new EventEmitter();
  userId: string;
  editToPass: object;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.userId = sessionStorage.getItem('userId')
  }

  editProfile() {
    let obs = this._httpService.getUserById(this.userId);
    obs.subscribe(res => {
      this.editToPass = res['data'][0];
     
    })
  }

  closeEditProfile($event){
    
    this.editToPass = null
    this.updateUserProfile($event)
    
  }

  updateUserProfile($event){
    this.updateUserProfileAfterEdit.emit(false)
  }
  
  
}
