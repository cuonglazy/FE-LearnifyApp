import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILesson } from '../pages/lesson/lesson.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export type EntityResponseType = HttpResponse<ILesson>
export type EntityArrayResponseType = HttpResponse<ILesson[]>
@Injectable({
  providedIn: 'root'
})
export class LessonService {

  protected resourceUrl = `${environment.apiBaseUrl}/lessons`
  protected token = localStorage.getItem("access_token");
  constructor(protected http:HttpClient) { }

  findAll(req?: any): Observable<EntityArrayResponseType>{
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`);
    return this.http.get<ILesson[]>(`${this.resourceUrl}`, {headers, observe: 'response'})
  }

  findAllPages(req?: any): Observable<EntityArrayResponseType>{
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
    return this.http.get<ILesson[]>(`${this.resourceUrl}/page`, { headers, observe: 'response', params });
  }
}