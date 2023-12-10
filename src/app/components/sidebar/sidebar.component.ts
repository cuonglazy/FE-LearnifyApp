import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/system-admin/dashboard",
    title: "Dashboard",
    icon: "ni-tv-2 text-primary",
    class: "",
  },
  {
    path: "/system-admin/user-profile",
    title: "User profile",
    icon: "ni-single-02 text-blue",
    class: "",
  },
  {
    path: "/system-admin/discount",
    title: "Discount",
    icon: "ni-air-baloon text-blue",
    class: "",
  },
  {
    path: "/system-admin/category",
    title: "Category",
    icon: "ni-tag text-blue",
    class: "",
  },
  {
    path: "/system-admin/lesson",
    title: "Lesson",
    icon: "ni-book-bookmark text-blue",
    class: "",
  },
  {
    path: "/system-admin/section",
    title: "Section",
    icon: "ni-books text-blue",
    class: "",
  },
  {
    path: "/system-admin/course",
    title: "Course",
    icon: "ni-folder-17 text-blue",
    class: "",
  },
  {
    path: "/system-admin/payment",
    title: "Payment",
    icon: "ni-credit-card text-blue",
    class: "",
  },
  {
    path: "/system-admin/icons",
    title: "Icons",
    icon: "ni-bullet-list-67 text-blue",
    class: "",
  },
  {
    path: "/login",
    title: "Login",
    icon: "ni-key-25 text-blue",
    class: "",
  },
  {
    path: "/register",
    title: "Register",
    icon: "ni-circle-08 text-blue",
    class: "",
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
}
