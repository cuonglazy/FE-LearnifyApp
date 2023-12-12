import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { CategoriesComponent } from "src/app/pages/category/list/categories.component";
import { UpdateCategoryComponent } from "src/app/pages/category/update/update.category.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  {
    path: "user-profile",
    loadChildren: () =>
      import("./../../pages/user-profile/user-profile.module").then(
        (m) => m.UserProfileModule
      ),
  },
  {
    path: "category",
    loadChildren: () =>
      import("./../../pages/category/category.module").then(
        (m) => m.CategoryModule
      ),
  },
  {
    path: "discount",
    loadChildren: () =>
      import("./../../pages/discount/discount.module").then(
        (m) => m.DiscountModule
      ),
  },
  {
    path: "lesson",
    loadChildren: () =>
      import("./../../pages/lesson/lesson.module").then((m) => m.LessonModule),
  },
  {
    path: "payment",
    loadChildren: () =>
      import("./../../pages/payment/payment.module").then(
        (m) => m.PaymentModule
      ),
  },
  {
    path: "course",
    loadChildren: () =>
      import("./../../pages/course/course.module").then((m) => m.CourseModule),
  },
  {
    path: "section",
    loadChildren: () =>
      import("./../../pages/section/section.module").then(
        (m) => m.SectionModule
      ),
  },
  { path: "icons", component: IconsComponent },
];