import { NgModule } from "@angular/core";
import { CategoryRoutingModule } from "./route/category-routing.module";
import { ClipboardModule } from "ngx-clipboard";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CategoriesComponent } from "./list/categories.component";
import { CategoryDetailComponent } from "./detail/category.detail.component";
import { UpdateCategoryComponent } from "./update/update.category.component";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ClipboardModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CategoriesComponent,
    CategoryDetailComponent,
    UpdateCategoryComponent,
  ],
})
export class CategoryModule {}
