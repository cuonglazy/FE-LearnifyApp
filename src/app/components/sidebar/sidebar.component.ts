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
    icon: "ni-single-02 text-yellow",
    class: "",
  },
  {
    path: "/system-admin/discount",
    title: "Discount",
    icon: "ni-air-baloon text-red",
    class: "",
  },
  {
    path: "/system-admin/category",
    title: "Category",
    icon: "ni-bullet-list-67 text-red",
    class: "",
  },
  {
    path: "/system-admin/lesson",
    title: "Lesson",
    icon: "ni-book-bookmark text-red",
    class: "",
  },
  {
    path: "/system-admin/section",
    title: "Section",
    icon: "ni-book-bookmark text-red",
    class: "",
  },
  {
    path: "/system-admin/course",
    title: "Course",
    icon: "ni-books text-red",
    class: "",
  },
  {
    path: "/system-admin/payment",
    title: "Payment",
    icon: "ni-credit-card text-red",
    class: "",
  },
  {
    path: "/system-admin/icons",
    title: "Icons",
    icon: "ni-bullet-list-67 text-red",
    class: "",
  },
  {
    path: "/login",
    title: "Login",
    icon: "ni-key-25 text-info",
    class: "",
  },
  {
    path: "/register",
    title: "Register",
    icon: "ni-circle-08 text-pink",
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
