import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: object;

  constructor(
    private _httpService: HttpService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.user = {};
  }
  
  loginUser() {
    let obs = this._httpService.loginUser(this.user)
    obs.subscribe(res => {
      console.log(res);
      if (res['data']) {
        sessionStorage.setItem('userId', res['data']['userId']);
        sessionStorage.setItem('userFirstName', res['firstName']);
        this._router.navigate(['/home']);
      } else {
        console.log('login error');
      }
    })
  }
}
