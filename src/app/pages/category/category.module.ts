import { AdminLayoutModule } from "./../../layouts/admin-layout/admin-layout.module";
import { NgModule } from "@angular/core";
import { CategoryRoutingRoutingModule } from "./route/category-routing-routing.module";
import { ClipboardModule } from "ngx-clipboard";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CategoriesComponent } from "./list/categories.component";
import { CategoryDetailComponent } from "./detail/category.detail.component";
import { UpdateCategoryComponent } from "./update/update.category.component";

@NgModule({
  imports: [
    CategoryRoutingRoutingModule,
    ClipboardModule,
    FormsModule,
    NgbModule,
  ],
  declarations: [
    CategoriesComponent,
    CategoryDetailComponent,
    UpdateCategoryComponent,
  ],
})
export class CategoryModule {}
