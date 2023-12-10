import { CategoryRoutingResolveService } from "./category-routing-resolve.service";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UpdateCategoryComponent } from "../update/update.category.component";
import { CategoryDetailComponent } from "../detail/category.detail.component";
import { CategoriesComponent } from "../list/categories.component";

const categoryRoutes: Routes = [
  {
    path: "",
    component: CategoriesComponent,
  },
  {
    path: "new",
    component: UpdateCategoryComponent,
    resolve: {
      CategoryRoutingResolveService,
    },
  },
  {
    path: ":id/edit",
    component: UpdateCategoryComponent,
    resolve: {
      CategoryRoutingResolveService,
    },
  },
  {
    path: ":id/view",
    component: CategoryDetailComponent,
    resolve: {
      CategoryRoutingResolveService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(categoryRoutes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
