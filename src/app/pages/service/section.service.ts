import { Observable } from "rxjs";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ISection } from "../section/section.model";

export type EntityResponseType = HttpResponse<ISection>;
export type EntityArrayResponseType = HttpResponse<ISection[]>;

@Injectable({
  providedIn: "root",
})
export class SectionService {
  protected resourceUrl = `${environment.apiBaseUrl}/section`;
  constructor(protected http: HttpClient) {}

  findAll(req?: any): Observable<EntityArrayResponseType> {
    return this.http.get<ISection[]>(`${this.resourceUrl}`, {
      observe: "response",
    });
  }
}
