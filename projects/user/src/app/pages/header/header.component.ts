import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserImage } from 'src/app/models/user.image';
import { UserResponse } from 'src/app/responses/users/user.response';
import { TokenService } from 'src/app/service/token.service';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  token: string = '';
  userImageData: any;
  userResponse?: UserResponse;

  constructor(private router: Router,
    private tokenService: TokenService,
    private userService: UserService,
    ) {}

  ngOnInit() {
    this.getNameHeader();
    this.token = this.tokenService.getToken() ?? ''
    this.userService.getUserDetails(this.token).subscribe({
      next: (response: any) => {

        /*
          Phần load ảnh ra HTML và đọc ảnh bằng API
        */
        if(response.user_images && response.user_images.length > 0) {
            response.user_images.forEach((user_image:UserImage) => {
              user_image.image_url = `${environment.apiBaseUrl}/users/readImage/${user_image.image_url}`
            });
        }
        this.userImageData = response.user_images;
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        alert(error.error.message);
      }
    })
  }

  onLogOut() {
    this.userService.removeUserFromLocalStorage();
    this.tokenService.removeToken();
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
  }

  getNameHeader() {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
  }

  goToHome() {
    this.router.navigate(['courses']);
  }
}
