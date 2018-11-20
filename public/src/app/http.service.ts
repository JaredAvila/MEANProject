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
}
