import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class RatingService{
    protected apiDiscount = `${environment.apiBaseUrl}`;
    protected token = localStorage.getItem("access_token");
    constructor(protected http: HttpClient) { }

    create(rating: any): Observable<any> {
        const headers = new HttpHeaders().set('Authorization',`Bearer ${this.token}`)
        const options = {
          headers: headers,
          observe: 'response' as 'response'
        }
        return this.http.post<any>(`${this.apiDiscount}/rating`, rating, options);
    }

    getAllRatingByCourseId(id:number):Observable<any>{
        const headers = new HttpHeaders().set('Authorization',`Bearer ${this.token}`)
        const options = {
          headers: headers,
          observe: 'response' as 'response'
        }
        return this.http.get<any>(`${this.apiDiscount}/ratings/${id}`, options);
    }

    updateRating(id:any, rating:any):Observable<any>{
        const headers = new HttpHeaders().set('Authorization',`Bearer ${this.token}`)
        const options = {
          headers: headers,
          observe: 'response' as 'response'
        }
        return this.http.put<any>(`${this.apiDiscount}/rating/${id}`, rating, options);
    }
}