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
  userResponse?: UserResponse;


  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService
  ) {
    this.location = location;
  }

  ngOnInit() {
    this.getNameHeader();

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
    this.router.navigate(['login']);
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
