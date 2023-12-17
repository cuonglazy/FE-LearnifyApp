import { Component, OnInit, ElementRef } from "@angular/core";
import { ROUTES } from "../sidebar/sidebar.component";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from "@angular/common";
import { Router } from "@angular/router";
import { UserService } from "src/app/service/user.service";
import { UserResponse } from "src/app/responses/users/user.response";
import { TokenService } from "src/app/service/token.service";
import { environment } from "src/environments/environment";
import { UserImage } from "src/app/models/user.image";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;

  //----
  token: string = '';
  userImageData: any;
  userResponse?: UserResponse;


  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private tokenService: TokenService,
    private userService: UserService,
  ) {
    this.location = location;
  }

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

    //Xử lí phía UI template
    this.listTitles = ROUTES.filter((listTitle) => listTitle);
  }

  getNameHeader() {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
  }

  onLogOut() {
    this.userService.removeUserFromLocalStorage();
    this.tokenService.removeToken();
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === "#") {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return "Dashboard";
  }
}
