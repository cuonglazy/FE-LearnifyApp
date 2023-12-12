import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICourse } from '../pages/course/course.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CategoryService } from './category.service';
import { ICategory } from '../pages/category/category.model';

export type EntityResponseType = HttpResponse<ICourse>;
export type EntityArrayResponseType = HttpResponse<ICourse[]>;
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  protected resourceUrl = `${environment.apiBaseUrl}/courses`;
  protected token = localStorage.getItem("access_token");
  constructor(
    protected http: HttpClient,
    private categoryService: CategoryService
    ) { }

  // findAll(req?: any): Observable<EntityArrayResponseType> {
  //   const headers = new HttpHeaders().set(
  //     "Authorization",
  //     `Bearer ${this.token}`
  //   );
  //   const options = {
  //     headers: headers,
  //     observe: "response" as "response",
  //   };
  //   return this.http.get<ICourse[]>(`${this.resourceUrl}`, options);
  // }

  create(discount: ICourse): Observable<EntityResponseType>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${this.token}`)
    const options = {
      headers: headers,
      observe: 'response' as 'response'
    }
    return this.http.post<ICourse>(this.resourceUrl, discount, options); 
  }

  findAll(): Observable<EntityArrayResponseType> {
    const headers = new HttpHeaders().set('Authorization',`Bearer ${this.token}`)
    
    const options = {
      headers: headers,
      observe: 'response' as 'response'
    }
    return this.http.get<ICourse[]>(this.resourceUrl, options);
  }

}
