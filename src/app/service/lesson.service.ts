import { ILesson, getLessonIdentifier } from './../pages/lesson/lesson.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, filter, map, tap } from 'rxjs';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';

export type EntityResponseType = HttpResponse<ILesson>
export type EntityArrayResponseType = HttpResponse<ILesson[]>
@Injectable({
  providedIn: 'root'
})
export class LessonService {
  uploadProgress: number = 0;

  protected resourceUrl = `${environment.apiBaseUrl}/lessons`
  protected token = localStorage.getItem("access_token");
  constructor(protected http:HttpClient) { }

  create(lesson: ILesson): Observable<EntityResponseType> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${this.token}`);
    const formData: FormData = this.buildLessonFormData(lesson);
  
    const req = new HttpRequest('POST', this.resourceUrl, formData, {
      headers: headers,
      reportProgress: true
    });
  
    return this.http.request(req).pipe(
      tap(event => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total && typeof event.loaded === 'number') {
            this.uploadProgress = Math.round(100 * event.loaded / event.total);
          }
        } else if (event instanceof HttpResponse) {
          // Upload đã hoàn tất, đặt progress về 100
          this.uploadProgress = 100;
        }
      }),
      filter(event => event instanceof HttpResponse),
      map(event => event as EntityResponseType)
    );
  }
  

  update(lesson: ILesson): Observable<EntityResponseType>{
    const headers = new HttpHeaders().set("Authorization",`Bearer ${this.token}`);
    return this.http.put<ILesson>(`${this.resourceUrl}/${getLessonIdentifier(lesson)}`, lesson, {headers, observe: 'response'});
  }

  private buildLessonFormData(lesson: ILesson): FormData {
    const formData: FormData = new FormData();
  
    // Thêm các trường của bài học vào FormData
    formData.append('id', lesson.id?.toString() || '');
    formData.append('title', lesson.title || '');
    formData.append('time', lesson.time?.toString() || '');
    formData.append('video_url', lesson.video_url || '');
    formData.append('section_id', lesson.section_id?.toString() || '');
  
    // Nếu có tệp video, thêm nó vào FormData
    if (lesson.videoFile) {
      formData.append('videoFile', lesson.videoFile);
    }
    return formData;
  }
  

  delete(id: number): Observable<EntityResponseType> {
    const headers = new HttpHeaders().set("Authorization",`Bearer ${this.token}`);
    return this.http.delete(`${this.resourceUrl}/${id}`, {headers, observe: 'response'});
  }

  findAll(): Observable<EntityArrayResponseType>{
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

  findById(id: number): Observable<EntityResponseType>{
    const headers = new HttpHeaders().set("Authorization",`Bearer ${this.token}`);
    return this.http.get<ILesson>(`${this.resourceUrl}/${id}`, {headers , observe: 'response'});
  }

}
