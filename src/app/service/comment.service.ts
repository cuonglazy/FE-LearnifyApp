import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { JwtHelperService} from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CommentService {
    protected apiComments = `${environment.apiBaseUrl}`
    protected token = localStorage.getItem("access_token")

    constructor(private http: HttpClient) {

    }

    create(comment: any): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
        const options = {
            headers: headers,
            observe: 'response' as 'response'
        }
        return this.http.post<any>(`${this.apiComments}/comment`, comment, options)
    }

    getAllCommentByCourseId(id: number): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
        const options = {
            headers: headers,
            observe: 'response' as 'response'
        }
        return this.http.get<any>(`${this.apiComments}/comments/${id}`, options)
    }

    update(id: any, comment: any): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
        const options = {
            headers: headers,
            observe: 'response' as 'response'
        }
        return this.http.put<any>(`${this.apiComments}/comment/${id}`, comment, options)
    }

    delete(id: any): Observable<any> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`)
        const options = {
            headers: headers,
            observe: 'response' as 'response'
        }
        return this.http.delete<any>(`${this.apiComments}/comment/${id}`, options)
    }
}