import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) {
  }

  // USER ROUTES
  getAllUsers() {
    return this._http.get('/api/users/all')
  }
  getUserById(id: string) {
    return this._http.get('/api/users/' + id)
  }
  createUser(user: object) {
    return this._http.post('/api/users/new', user)
  }
  updateUserById(id: string, user: object) {
    return this._http.put('/api/users/update/' + id, user)
  }
  updateWalletById(walletInfo: object) {
    return this._http.put('/api/users/update/wallet', walletInfo)
  }
  nukeUserById(userId: string, categoryId: string) {
    return this._http.delete('/api/users/delete/'+ userId +'/:categoryId' + categoryId)
  }
  loginUser(user: object) {
    return this._http.post('/api/login', user);
  }

  // AUCTION ROUTES
  getAllAuctions() {
    return this._http.get('/api/auctions/all')
  }
  getAuctionById(id: string) {
    return this._http.get('/api/auctions/' + id)
  }
  createAuction(auction: object) {
    return this._http.post('/api/auctions/new', auction)
  }
  updateAuctionById(id: string, auction: object) {
    return this._http.put('/api/auctions/update' + id, auction)
  }
  nukeAuctionById(auctionId: string, categoryId: string) {
    return this._http.delete('/api/auctions/delete/'+ auctionId +'/:categoryId' + categoryId)
  }

  // BID ROUTES
  getAllBidsByAuction(auctionId: string) {
    return this._http.get('/api/bids/auction/' + auctionId)
  }
  createBid(newBid: object) {
    return this._http.post('/api/bids/new', newBid)
  }

  // CATEGORY ROUTES
  createDefaultCategories(category: object) {
    return this._http.post('/api/createCategories', category)
  }
  // getCategoryByName(name: string) {
  //   return this._http.get('/api/categories/'+ name)
  // }
  getCategoryByAuctionId(auctionId: string) {
    return this._http.get('/api/categories/name/'+ auctionId)
  }

  getAuctionsByCategoryName(categoryName) {
    return this._http.get('/api/categories/'+ categoryName)
  }
}
