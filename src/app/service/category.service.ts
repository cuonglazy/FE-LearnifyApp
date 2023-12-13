import { HttpResponse, HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  ICategory,
  getCategoryIdentifier,
} from "../pages/category/category.model";
import { environment } from "src/environments/environment";
import { Observable, map } from "rxjs";

export type EntityResponseType = HttpResponse<ICategory>;
export type EntityArrayResponseType = HttpResponse<ICategory[]>;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  [x: string]: any;
  protected resourceUrl = `${environment.apiBaseUrl}/categories`;
  protected token = localStorage.getItem("access_token");
  constructor(protected http: HttpClient) {}

  create(category: ICategory): Observable<EntityResponseType> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `Bearer ${this.token}`
    );
    const options = {
      headers: headers,
      observe: "response" as "response",
    };
    return this.http.post<ICategory>(this.resourceUrl, category, options);
  }

  update(category: ICategory): Observable<EntityResponseType> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `Bearer ${this.token}`
    );
    const options = {
      headers: headers,
      observe: "response" as "response",
    };
    return this.http.put<ICategory>(
      `${this.resourceUrl}/${getCategoryIdentifier(category)}`,category,options
    );
  }

  delete(id: number): Observable<EntityResponseType> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `Bearer ${this.token}`
    );
    const options = {
      headers: headers,
      observe: "response" as "response",
    };

    return this.http.delete(`${this.resourceUrl}/${id}`, options)
  }

  findAllCategory(req?: any): Observable<EntityArrayResponseType> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `Bearer ${this.token}`
    );
    const options = {
      headers: headers,
      observe: "response" as "response",
    };
    return this.http.get<ICategory[]>(`${this.resourceUrl}`, options);
  }
  
  findAllPage(req?: any): Observable<EntityArrayResponseType> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`);
    let params = new HttpParams();
    if (req) {
      if (req.page !== undefined) {
        params = params.set('page', req.page.toString());
      }
      if (req.size !== undefined) {
        params = params.set('size', req.size.toString());
      }
      if (req.keyword !== undefined) {
        params = params.set('keyword', req.keyword.toString());
      }
    }
    return this.http.get<ICategory[]>(`${this.resourceUrl}/page`, { headers, observe: 'response', params });
  }

  find(id: number): Observable<EntityResponseType> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `Bearer ${this.token}`
    );
    const options = {
      headers: headers,
      observe: "response" as "response",
    };
    return this.http.get<ICategory>(`${this.resourceUrl}/${id}`, options);
  }
}
