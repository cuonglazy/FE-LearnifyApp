import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/user/register.dto';
import { LoginDTO } from '../dtos/user/login.dto';
import { environment } from '../environments/environment';
import { HttpUtilService } from './http.util.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiRegister = `${environment.apiBaseUrl}/users/register`;
  private apiLogin = `${environment.apiBaseUrl}/users/login`;
  protected token = localStorage.getItem("access_token");
  private apiGetAllUser = `http://localhost:8080/api/v1/users`; // ${environment.apiBaseUrl}/users?keyword=&page=1&limit=12
  
  private apiConfig = {
    headers: this.createHeaders()
  }

  constructor(private http: HttpClient, private httpUtilService: HttpUtilService) {

  }

  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'vi'
    })
  }

  register(registerDTO: RegisterDTO): Observable<any> {
    return this.http.post(this.apiRegister, registerDTO, this.apiConfig)
  }

  login(loginDTO: LoginDTO): Observable<any> {
    return this.http.post(this.apiLogin, loginDTO, this.apiConfig)
  }

  getAllUsers( keyword: string, page: number, limit: number): Observable<any> {
    const params = new HttpParams().set('keyword', keyword)
                                  .set('page', page.toString())
                                  .set('limit', limit.toString());
    return this.http.get<User[]>(this.apiGetAllUser, {params});
  }

  getByID(id: number): Observable<any> {
    const headers = new HttpHeaders().set(
      "Authorization",
      `Bearer ${this.token}`
    );
    const options = {
      headers: headers,
      observe: "response" as "response",
    };
    return this.http.get<User>(`${this.apiGetAllUser}/${id}}`, options); 
  }
}