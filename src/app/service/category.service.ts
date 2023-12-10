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
  providedIn: "root",
})
export class CategoryService {
  protected resourceUrl = `${environment.apiBaseUrl}/categories`;
  protected token =
    "eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImN1b25nMDM3MDhAZ21haWwuY29tIiwic3ViIjoiY3VvbmcwMzcwOEBnbWFpbC5jb20iLCJleHAiOjE3MDQ2NDQyNDF9.HcMbAqc8dF0-rX8tXOLIWla2JVIx1zIMNmWBpGMrGgs";
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
