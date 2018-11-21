import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-show-wallet',
  templateUrl: './show-wallet.component.html',
  styleUrls: ['./show-wallet.component.css']
})
export class ShowWalletComponent implements OnInit {
  @Input() childShowWallet: any;
  userId: string;
  updateWallet: number;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.userId = sessionStorage.getItem('userId')
    this.updateWallet = 0
  }

  updateWalletbalance(){
    let obs = this._httpService.updateWalletById(this.userId, this.updateWallet);
    obs.subscribe(res => {
      console.log(res)
      // if (res['data']['errors']) {
      //   this.errors = res['data']['errors'];
      // } else {
      //   this.cancelEditProfile()
      // }
      this.updateWallet = 0
    })
  }
}
