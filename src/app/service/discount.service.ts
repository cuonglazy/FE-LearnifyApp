import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Discount, IDiscount, IDiscountCourse, getDiscountCourseIdentifier, getDiscountIdentifier } from "../pages/discount/discount.model";
import { environment } from "src/environments/environment";


export type EntityResponseType = HttpResponse<IDiscount>;
export type EntityResponseType1 = HttpResponse<IDiscountCourse>;
export type EntityArrayResponseType = HttpResponse<IDiscount[]>;

@Injectable({
    providedIn: 'root'
})
export class DiscountService {
    protected apiDiscount = `${environment.apiBaseUrl}/discounts`;
    protected apiPostDiscountCS = `${environment.apiBaseUrl}/discount-course`;
    protected token = localStorage.getItem("access_token");
    constructor(protected http: HttpClient) { }

      create(discount: IDiscount): Observable<EntityResponseType>{
        const headers = new HttpHeaders().set('Authorization',`Bearer ${this.token}`)
        const options = {
          headers: headers,
          observe: 'response' as 'response'
        }
        return this.http.post<IDiscount>(this.apiDiscount, discount, options); 
      }
    
      update(discount: IDiscount): Observable<EntityResponseType>{
        const headers = new HttpHeaders().set('Authorization',`Bearer ${this.token}`)
        const options = {
          headers: headers,
          observe: 'response' as 'response'
        }

        return this.http.put<IDiscount>(`${this.apiDiscount}/${getDiscountIdentifier(discount) as number}`,discount , options);
      }
    
      delete(id: number): Observable<HttpResponse<{}>> {
        const headers = new HttpHeaders().set('Authorization',`Bearer ${this.token}`)
        const options = {
          headers: headers,
          observe: 'response' as 'response'
        }

        return this.http.delete<any>(`${this.apiDiscount}/${id}`, options);
      }
    
      findAll(): Observable<EntityArrayResponseType> {
        const headers = new HttpHeaders().set('Authorization',`Bearer ${this.token}`)
        
        const options = {
          headers: headers,
          observe: 'response' as 'response'
        }
    
        return this.http.get<IDiscount[]>(this.apiDiscount, options);
      }
      
      findOne(id: number): Observable<any> {
        const headers = new HttpHeaders().set('Authorization',`Bearer ${this.token}`)
        const options = {
          headers: headers,
          observe: 'response' as 'response'
        }
        return this.http.get<IDiscount>(`${this.apiDiscount}/${id}`,options);
      }

      findCode(code: string): Observable<EntityResponseType> {
        return this.http.get<IDiscount>(`${this.apiDiscount}/code/${code}`,{observe: 'response'})
      }

      findPage(req:any): Observable<EntityArrayResponseType>{
        const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`);
        let params = new HttpParams();
        params = params.set('keyword', req.keyword);
        params = params.set('page', req.page.toString());
        params = params.set('size', req.size.toString());
        return this.http.get<IDiscount[]>(`${this.apiDiscount}/pages`,{ headers, observe: 'response', params });
      }

      //  Discount Course
    
      createDiscountCourse(discountCourse: IDiscountCourse): Observable<EntityResponseType1>{
        return this.http.post<IDiscountCourse>(this.apiPostDiscountCS,discountCourse, {observe: 'response'});
      }

      updateDiscountCourse(discountCourse: IDiscountCourse): Observable<EntityResponseType>{
        const headers = new HttpHeaders().set('Authorization',`Bearer ${this.token}`)
        const options = {
          headers: headers,
          observe: 'response' as 'response'
        }
        return this.http.put<IDiscount>(`${this.apiPostDiscountCS}/${getDiscountCourseIdentifier(discountCourse) as number}`,discountCourse , options);
      }
      
      updateIsDelete(id: number,isDelete: boolean): Observable<HttpResponse<{}>> {
        const headers = new HttpHeaders().set('Authorization',`Bearer ${this.token}`)
        const options = {
          headers: headers,
          observe: 'response' as 'response'
        }
        return this.http.put<any>(`${this.apiPostDiscountCS}/${id}/${isDelete}`, options)
      }

      deleteDiscountCourse(id: number): Observable<HttpResponse<{}>> {
        const headers = new HttpHeaders().set('Authorization',`Bearer ${this.token}`)
        const options = {
          headers: headers,
          observe: 'response' as 'response'
        }
        return this.http.delete<any>(`${this.apiPostDiscountCS}/${id}`, options)
      }


}