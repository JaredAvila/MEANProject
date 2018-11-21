import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

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


const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "home", component: HomeComponent },
  { path: "home/:categoryName", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegistrationComponent },
  { path: "user-profile/:id", component: UserProfileComponent },
  // { path: "user-profile/:id", component: UserProfileComponent, children: [
  //   { path: "show", component: ShowProfileComponent },
  //   { path: "edit", component: EditProfileComponent },
  //   { path: "wallet", component: ShowWalletComponent },
  //   { path: "auction-watched", component: ShowAuctionsWatchedComponent },
  //   { path: "auction-created", component: ShowAuctionsCreatedComponent }
  // ]},

  { path: "auctions/new", component: NewAuctionComponent },
  { path: "auctions/:id", component: ShowAuctionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
