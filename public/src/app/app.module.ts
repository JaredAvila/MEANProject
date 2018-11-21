import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { Ng2CarouselamosModule } from "ng2-carouselamos";

import { DurationPickerModule } from "ngx-duration-picker";
import { CountdownModule } from 'ngx-countdown';

import { AppRoutingModule } from "./app-routing.module";
import { HttpService } from "./http.service";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { NewAuctionComponent } from "./new-auction/new-auction.component";
import { ShowAuctionComponent } from "./show-auction/show-auction.component";
import { SimilarItemsComponent } from "./similar-items/similar-items.component";
import { AuctionMenuComponent } from "./auction-menu/auction-menu.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ShowProfileComponent } from './show-profile/show-profile.component';
import { ShowWalletComponent } from './show-wallet/show-wallet.component';
import { ShowAuctionsWatchedComponent } from './show-auctions-watched/show-auctions-watched.component';
import { ShowAuctionsCreatedComponent } from './show-auctions-created/show-auctions-created.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    NewAuctionComponent,
    ShowAuctionComponent,
    SimilarItemsComponent,
    AuctionMenuComponent,
    UserProfileComponent,
    EditProfileComponent,
    ShowProfileComponent,
    ShowWalletComponent,
    ShowAuctionsWatchedComponent,
    ShowAuctionsCreatedComponent
  ],
  imports: [
    BrowserModule,
    CountdownModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    Ng2CarouselamosModule,
    DurationPickerModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule {}
