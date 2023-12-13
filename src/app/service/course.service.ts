import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICourse } from '../pages/course/course.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

export type EntityResponseType = HttpResponse<ICourse>;
export type EntityArrayResponseType = HttpResponse<ICourse[]>;
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  protected resourceUrl = `${environment.apiBaseUrl}/courses`;
  protected token = localStorage.getItem("access_token");
  constructor(protected http: HttpClient) { }

  findAll(): Observable<any> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `Bearer ${this.token}`
    );
    const options = {
      headers: headers,
      observe: "response" as "response",
    };
    return this.http.get<ICourse[]>(`${this.resourceUrl}`, options);
  }

}
