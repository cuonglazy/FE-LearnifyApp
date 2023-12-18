import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  protected resourceUrl = `${environment.apiBaseUrl}/payment`;
  protected token = localStorage.getItem("access_token");
  constructor(protected http: HttpClient) {}

  create(data: any): Observable<any> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `Bearer ${this.token}`
    );
    console.warn( data);
   
    return this.http.post<any>(`${this.resourceUrl}/create`, data, {headers, observe: 'response'});
  }
}
