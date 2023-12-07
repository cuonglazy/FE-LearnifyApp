import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { CategoriesComponent } from "src/app/pages/category/list/categories.component";
import { UpdateCategoryComponent } from "src/app/pages/category/update/update.category.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "user-profile", component: UserProfileComponent },
  { path: "tables", component: TablesComponent },
  {
    path: "category",
    loadChildren: () =>
      import("./../../pages/category/category.module").then(
        (m) => m.CategoryModule
      ),
  },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapsComponent },
];
