import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/user/register.dto';
import { LoginDTO } from '../dtos/user/login.dto';
import { environment } from '../environments/environment';
import { HttpUtilService } from './http.util.service';
import { User } from '../models/user';
import { UserResponse } from '../responses/users/user.response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiRegister = `${environment.apiBaseUrl}/users/register`;
  private apiLogin = `${environment.apiBaseUrl}/users/login`;
  private apiGetAllUser = `${environment.apiBaseUrl}/users`; // ${environment.apiBaseUrl}/users?keyword=&page=1&limit=12
  private apiUserDetails = `${environment.apiBaseUrl}/users/details`
  
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

  getAllUsers(keyword: string, page: number, limit: number): Observable<any> {
    const params = new HttpParams().set('keyword', keyword)
                                  .set('page', page.toString())
                                  .set('limit', limit.toString());
    return this.http.get<User[]>(this.apiGetAllUser, {params});
  }

  getUserDetails(token: string): Observable<any> {
    return this.http.post(this.apiUserDetails, {
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    })
  }

  saveUserResponseToLocalStorage(userResponse?: UserResponse) {
    try {
      debugger
      if(userResponse == null || !userResponse) {
        return;
      }
      // Convert the userResponse object to a JSON string
      const userResponseJSON = JSON.stringify(userResponse);  
      // Save the JSON string to local storage with a key (e.g., "userResponse")
      localStorage.setItem('user', userResponseJSON);  
      console.log('User response saved to local storage.');
    } catch (error) {
      console.error('Error saving user response to local storage:', error);
    }
  }

  getUserResponseFromLocalStorage():UserResponse | null {
    try {
      // Retrieve the JSON string from local storage using the key
      const userResponseJSON = localStorage.getItem('user'); 
      if(userResponseJSON == null || userResponseJSON == undefined) {
        return null;
      }
      // Parse the JSON string back to an object
      const userResponse = JSON.parse(userResponseJSON!);  
      console.log('User response retrieved from local storage.');
      return userResponse;
    } catch (error) {
      console.error('Error retrieving user response from local storage:', error);
      return null; // Return null or handle the error as needed
    }
  }

  removeUserFromLocalStorage():void {
    try {
      // Remove the user data from local storage using the key
      localStorage.removeItem('user');
      console.log('User data removed from local storage.');
    } catch (error) {
      console.error('Error removing user data from local storage:', error);
      // Handle the error as needed
    }
  }
}