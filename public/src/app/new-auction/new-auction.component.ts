import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-auction',
  templateUrl: './new-auction.component.html',
  styleUrls: ['./new-auction.component.css']
})
export class NewAuctionComponent implements OnInit {
  newAuction: object;
  durationPickerOptions: object;

  constructor(
    private _httpService: HttpService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.newAuction = {}
    this.durationPickerOptions = {
      showButtons: false, 
      showPreview: false, 
      showYears: false, 
      showMonths: false, 
      showWeeks: false,
      showSeconds: false
    }
    console.log( sessionStorage.getItem('userId') );
    
  }

  createAuction() {
    this.newAuction['userId'] = sessionStorage.getItem('userId');
    console.log(this.newAuction);
    let obs = this._httpService.createAuction(this.newAuction);
    obs.subscribe(res => {
      console.log(res);
      if (res['data']['errors']) {
        console.log(res['data']['errors']);
      } else {
        this._router.navigate(['/home']);
      }
    })
  }

}
