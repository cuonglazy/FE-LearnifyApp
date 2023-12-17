import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { CategoriesComponent } from "src/app/pages/category/list/categories.component";
import { UpdateCategoryComponent } from "src/app/pages/category/update/update.category.component";
import { AdminGuard, AdminGuardFn } from "src/app/pages/guards/admin.guard";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent,
  canActivate: [AdminGuardFn]
  },
  {
    path: "user-profile",
    loadChildren: () =>
      import("./../../pages/user-profile/user-profile.module").then(
        (m) => m.UserProfileModule
      ),
      canActivate: [AdminGuardFn]
  },
  {
    path: "category",
    loadChildren: () =>
      import("./../../pages/category/category.module").then(
        (m) => m.CategoryModule
      ),
    canActivate: [AdminGuardFn]
  },
  {
    path: "discount",
    loadChildren: () =>
      import("./../../pages/discount/discount.module").then(
        (m) => m.DiscountModule
      ),
      canActivate: [AdminGuardFn]
  },
  {
    path: "lesson",
    loadChildren: () =>
      import("./../../pages/lesson/lesson.module").then((m) => m.LessonModule),
      canActivate: [AdminGuardFn]
  },
  {
    path: "payment",
    loadChildren: () =>
      import("./../../pages/payment/payment.module").then(
        (m) => m.PaymentModule
      ),
      canActivate: [AdminGuardFn]
  },
  {
    path: "course",
    loadChildren: () =>
      import("./../../pages/course/course.module").then((m) => m.CourseModule),
      canActivate: [AdminGuardFn]
  },
  {
    path: "section",
    loadChildren: () =>
      import("./../../pages/section/section.module").then(
        (m) => m.SectionModule
      ),
      canActivate: [AdminGuardFn]
  },
  { path: "icons", component: IconsComponent },
];