import { HttpResponse, HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ICategory } from "../category/category.model";
import { environment } from "src/environments/environment";
import { Observable, map } from "rxjs";

export type EntityResponseType = HttpResponse<ICategory>;
export type EntityArrayResponseType = HttpResponse<ICategory[]>;

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  protected resourceUrl = `${environment.apiBaseUrl}/categories`;

  constructor(protected http: HttpClient) {}

  create(category: ICategory): Observable<EntityResponseType>{
    return this.http.post<ICategory>(this.resourceUrl, category, { observe: "response" });
  }

  findAll(req?: any): Observable<EntityArrayResponseType> {
    return this.http.get<ICategory[]>(`${this.resourceUrl}`, {
      observe: "response"
    });
  }
}                                                                  
