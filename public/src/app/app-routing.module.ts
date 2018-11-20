import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";
import { NewAuctionComponent } from "./new-auction/new-auction.component";
import { ShowAuctionComponent } from "./show-auction/show-auction.component";
import { SimilarItemsComponent } from "./similar-items/similar-items.component";
import { AuctionMenuComponent } from "./auction-menu/auction-menu.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegistrationComponent },
  { path: "auctions/new", component: NewAuctionComponent },
  {
    path: "auctions/:id",
    component: ShowAuctionComponent,
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "suggestions"
      },
      { path: "suggestions", component: SimilarItemsComponent },
      { path: "menu", component: AuctionMenuComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
