import { HttpResponse, HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  ICategory,
  getCategoryIdentifier,
} from "../pages/category/category.model";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

export type EntityResponseType = HttpResponse<ICategory>;
export type EntityArrayResponseType = HttpResponse<ICategory[]>;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  protected resourceUrl = `${environment.apiBaseUrl}/categories`;
<<<<<<< HEAD
  protected token = `eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Im5nb25zb250cnVvbmc3NUBnbWFpbC5jb20iLCJzdWIiOiJuZ29uc29udHJ1b25nNzVAZ21haWwuY29tIiwiZXhwIjoxNzA0ODE1OTg2fQ.k-pNODOWfcsjgxkq0fyUQXoM1w9NjklajcW-xQNc8d0`;
    constructor(protected http: HttpClient) {}
=======
  protected token = localStorage.getItem("access_token");
  constructor(protected http: HttpClient) {}
>>>>>>> c29bea1f466731e687c4bc10ce70f66dd6dfa309

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
    // return this.http.post<ICategory>(this.resourceUrl, category, {
    //   observe: "response",
    // });
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
      `${this.resourceUrl}/${getCategoryIdentifier(category)} as number`,
      category,
      options
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

  findAll(req?: any): Observable<EntityArrayResponseType> {
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
