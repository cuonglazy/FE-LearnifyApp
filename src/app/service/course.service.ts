import { Course } from './../pages/course/course.model';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICourse, getCourseIdentifier } from '../pages/course/course.model';
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
  protected token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiY3VvbmdAZW1haWwuY29tIiwic3ViIjoiY3VvbmdAZW1haWwuY29tIiwiZXhwIjoxNzA1MDI2MjYxfQ.T2khNmw-1JOx85GWLdWzOAiBmXvZgL8SLSzBNhj8q3Y';
  constructor(
    protected http: HttpClient,
    private categoryService: CategoryService
    ) { }
    
    create(course: ICourse): Observable<EntityResponseType>{
      const headers = new HttpHeaders().set('Authorization',`Bearer ${this.token}`)
      const options = {
        headers: headers,
        observe: 'response' as 'response'
      }
      return this.http.post<ICourse>(this.resourceUrl, course, options); 
    }


  update(course: ICourse): Observable<EntityResponseType> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
    const options = {
      headers: headers,
      observe: 'response' as 'response'
    }
    return this.http.put<ICourse>(`${this.resourceUrl}/${getCourseIdentifier(course)}`, course, options);
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    const headers = new HttpHeaders().set('Authorization',`Bearer ${this.token}`)
    const options = {
      headers: headers,
      observe: 'response' as 'response'
    }

    return this.http.delete<any>(`${this.resourceUrl}/${id}`, options);
  }

  findOne(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization',`Bearer ${this.token}`)
    const options = {
      headers: headers,
      observe: 'response' as 'response'
    }
    return this.http.get<ICourse>(`${this.resourceUrl}/${id}`,options);
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
