import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/user/register.dto';
import { LoginDTO } from '../dtos/user/login.dto';
import { environment } from '../environments/environment';
import { HttpUtilService } from './http.util.service';
import { User, UserImage } from '../models/user';
import { UserResponse } from '../responses/users/user.response';
import { UpdateUserDTO } from '../dtos/user/update.user.dto';
import { map } from 'rxjs';

export type EntityResponseType = HttpResponse<User>

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiRegister = `${environment.apiBaseUrl}/users/register`;
  private apiLogin = `${environment.apiBaseUrl}/users/login`;
  private apiGetAllUser = `${environment.apiBaseUrl}/users`; // ${environment.apiBaseUrl}/users?keyword=&page=1&limit=12
  private apiUserDetails = `${environment.apiBaseUrl}/users/details`
  private apiGetUserById = `${environment.apiBaseUrl}/users`;
  private apiPostImageForUser = `${environment.apiBaseUrl}/users/uploads`
  private apiGetImageOfUser = `${environment.apiBaseUrl}/users/image`
  
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

  // postImageForUser(userId: number, image: File): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('userId', userId.toString());
    
  //   // Convert the image file to a Base64 string
  //   return this.getBase64(image).pipe(
  //     map((base64Image: string) => {
  //       formData.append('image', base64Image);

  //       // You may need to adjust the headers based on your API requirements
  //       const headers = new HttpHeaders();
  //       headers.append('Content-Type', 'multipart/form-data');

  //       return this.http.post<User>(`${this.apiPostImageForUser}/${userId}`, formData, { headers })
  //     })
  //   );
  // }
  
  
  register(registerDTO: RegisterDTO): Observable<any> {
    return this.http.post(this.apiRegister, registerDTO, this.apiConfig)
  }

  login(loginDTO: LoginDTO): Observable<any> {
    return this.http.post(this.apiLogin, loginDTO, this.apiConfig)
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<User>(`${this.apiGetUserById}/${id}`, this.apiConfig)
  }

  getImageByUserId(userId: any): Observable<any> {
    return this.http.get<User>(`${this.apiGetImageOfUser}/${userId}`, this.apiConfig)
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

  // func này chỉ để cập nhật cho chính mình (private profile)
  //update User theo token
  updateUserDetail(token: string, user: User): Observable<any> {
    debugger
    let userResponse = this.getUserResponseFromLocalStorage();        
    return this.http.put(`${this.apiUserDetails}/${userResponse?.id}`, user ,
    {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      })
    })
  }

  updateUserById(id: number, user: User): Observable<any> {
    return this.http.put(`${this.apiUserDetails}/${id}`, user, this.apiConfig)
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

  // private getBase64(file: File): Observable<string> {
  //   return new Observable<string>((observer) => {
  //     const reader = new FileReader();

  //     reader.onloadend = () => {
  //       // Convert the array buffer to a Base64 string
  //       const base64String = reader.result?.toString().split(',')[1];
  //       observer.next(base64String);
  //       observer.complete();
  //     };

  //     reader.onerror = (error) => {
  //       observer.error(error);
  //     };

  //     reader.readAsDataURL(file);
  //   });
  // }
}