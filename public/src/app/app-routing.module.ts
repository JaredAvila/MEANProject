import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { NewAuctionComponent } from "./new-auction/new-auction.component";
import { ShowAuctionComponent } from "./show-auction/show-auction.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "home", component: HomeComponent },
  { path: "home/:categoryName", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegistrationComponent },
  { path: "user-profile/:id", component: UserProfileComponent },
  { path: "auctions/new", component: NewAuctionComponent },
  { path: "auctions/:id", component: ShowAuctionComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
