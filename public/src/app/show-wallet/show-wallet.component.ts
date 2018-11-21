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

  getUser() {
    let obs = this._httpService.getUserById(this.userId);
    obs.subscribe(res => {
      console.log(res);
      this.childShowWallet.wallet_balance = res["data"][0]['wallet_balance'];
    });
  }

  ngOnInit() {
    this.userId = sessionStorage.getItem('userId')
    this.updateWallet = null;
  }

  updateWalletbalance(){
    console.log(this.updateWallet)

    let obs = this._httpService.updateWalletById({id: this.userId, wallet_balance: this.updateWallet});
    obs.subscribe(res => {
      console.log(res)
      // if (res['data']['errors']) {
      //   this.errors = res['data']['errors'];
      // } else {
      //   this.cancelEditProfile()
      // }
      this.getUser();
      this.updateWallet = null;
    })
  }
}
