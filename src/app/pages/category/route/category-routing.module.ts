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
  },
  {
    path: ":id/view",
    component: CategoryDetailComponent,
  },
  {
    path: ":id/edit",
    component: UpdateCategoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(categoryRoutes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
