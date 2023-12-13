import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ISection, getSectionIdentifier } from "../pages/section/section.model";

export type EntityResponseType = HttpResponse<ISection>;
export type EntityArrayResponseType = HttpResponse<ISection[]>;

@Injectable({
  providedIn: "root",
})
export class SectionService {
  protected resourceUrl = `${environment.apiBaseUrl}`;
  protected token = localStorage.getItem("access_token");

  constructor(protected http: HttpClient) {}

  create(section: ISection): Observable<EntityResponseType>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${this.token}`)
    const options = {
      headers: headers,
      observe: 'response' as 'response'
    }
    return this.http.post<ISection>(`${this.resourceUrl}/section`, section, options); 
  }

  update(section: ISection): Observable<EntityResponseType>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${this.token}`)
    const options = {
      headers: headers,
      observe: 'response' as 'response'
    }
    return this.http.put<ISection>(`${this.resourceUrl}/section/${getSectionIdentifier(section) as number}`,section , options);
  }

  findAll(): Observable<any> {
    return this.http.get<ISection[]>(`${this.resourceUrl}/sections`, {
      observe: "response",
    });
  } 

  findAllLesson(): Observable<EntityArrayResponseType> {
    return this.http.get<ISection[]>(`${this.resourceUrl}/lessons`, {
      observe: "response",
    });
  } 

  findOne(id:number): Observable<any> {
    return this.http.get<ISection[]>(`${this.resourceUrl}/section/${id}`, {
      observe: "response",
    });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    const headers = new HttpHeaders().set('Authorization',`Bearer ${this.token}`)
    const options = {
      headers: headers,
      observe: 'response' as 'response'
    }
    return this.http.delete<any>(`${this.resourceUrl}/section/${id}`, options);
  }
}
