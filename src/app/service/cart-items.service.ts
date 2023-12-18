import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { warn } from 'console';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CartItemsService {

  protected resourceUrl = `${environment.apiBaseUrl}/shoppingCarts`;
  protected token = localStorage.getItem("access_token");
  constructor(protected http: HttpClient) {}

  create(data: any): Observable<any> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `Bearer ${this.token}`
    );
    console.warn( data);
   
    return this.http.post<any>(`${this.resourceUrl}/save`, data, {headers, observe: 'response'});
  }

  getAllItems(userId: any): Observable<any[]> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `Bearer ${this.token}`
    );
      console.warn(headers);
      
    return this.http.get<any[]>(`${this.resourceUrl}/${userId}`, { headers });
  }
  
}
