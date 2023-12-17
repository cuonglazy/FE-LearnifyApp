import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartItemsService {

  protected resourceUrl = `${environment.apiBaseUrl}/shoppingCarts`;
  protected token = localStorage.getItem("access_token");
  constructor(protected http: HttpClient) {}

  // create()
}
