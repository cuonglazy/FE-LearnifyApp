import { Observable, filter, map, tap } from 'rxjs';
import { Course } from './../pages/course/course.model';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpRequest, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICourse, getCourseIdentifier } from '../pages/course/course.model';
import { environment } from 'src/environments/environment';

export type EntityResponseType = HttpResponse<ICourse>;
export type EntityArrayResponseType = HttpResponse<ICourse[]>;
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  uploadProgress: number = 0;

  protected resourceUrl = `${environment.apiBaseUrl}/courses`;
  protected token = localStorage.getItem("access_token");
 
  constructor(
    protected http: HttpClient,
    ) {}

    private createHeaders(): HttpHeaders {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept-Language': 'vi'
      })
    }
    
    // create(course: ICourse): Observable<EntityResponseType>{
    //   const headers = new HttpHeaders().set('Authorization',`Bearer ${this.token}`)
    //   const options = {
    //     headers: headers,
    //     observe: 'response' as 'response'
    //   }
    //   return this.http.post<ICourse>(this.resourceUrl, course, options); 
    // }

    create(course: ICourse): Observable<EntityResponseType> {
      const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`);
      const formData: FormData = this.buildLessonFormData(course);
    
      return this.http.post<ICourse>(this.resourceUrl, formData, {headers, observe: 'response'});
    }

    private buildLessonFormData(course: ICourse): FormData {
      const formData: FormData = new FormData();
    
      // Thêm các trường của khóa học vào FormData
      formData.append('id', course.id?.toString() || '');
      formData.append('title', course.title || '');
      formData.append('price', course.price?.toString() || '');
      formData.append('thumbnail', course.thumbnail || '');
      formData.append('categoryId', course.categoryId?.toString() || '');
      formData.append('userId', course.userId?.toString() || '');
      formData.append('description', course.description || '');
    
      // Nếu có tệp image, thêm nó vào FormData
      if (course.imageFile) {
        formData.append('imageFile', course.imageFile);
      }
      return formData;
    }

  update(course: ICourse): Observable<EntityResponseType> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`);
      const formData: FormData = this.buildLessonFormData(course);
    return this.http.put<ICourse>(`${this.resourceUrl}/${getCourseIdentifier(course)}`, formData, {headers, observe: 'response'});
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


  findOne(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization',`Bearer ${this.token}`)
    return this.http.get<ICourse>(`${this.resourceUrl}/${id}`, {headers, observe: 'response'});
  }

  findAll(): Observable<EntityArrayResponseType> {
    const headers = new HttpHeaders().set('Authorization',`Bearer ${this.token}`)
    const options = {
      headers: headers,
      observe: 'response' as 'response'
    }
    return this.http.get<ICourse[]>(this.resourceUrl, options);
  }

  findPage(req:any): Observable<EntityArrayResponseType>{
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`);
    let params = new HttpParams();
    params = params.set('keyword', req.keyword);
    params = params.set('page', req.page.toString());
    params = params.set('size', req.size.toString());
    return this.http.get<Course[]>(`${this.resourceUrl}/pages`,{ headers, observe: 'response', params });
  }

  findAllCourseInfo():Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${this.token}`)
    
    const options = {
      headers: headers,
      observe: 'response' as 'response'
    }
    return this.http.get<ICourse[]>(`${this.resourceUrl}/course-info`, options);
  }
}
