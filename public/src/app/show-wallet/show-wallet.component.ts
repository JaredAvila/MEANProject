import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-show-wallet',
  templateUrl: './show-wallet.component.html',
  styleUrls: ['./show-wallet.component.css']
})
export class ShowWalletComponent implements OnInit {
  @Input() childShowWallet: any;
  constructor() { }

  ngOnInit() {
  }

}
