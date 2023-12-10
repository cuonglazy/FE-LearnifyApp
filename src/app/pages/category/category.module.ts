import { NgModule } from "@angular/core";
import { CategoryRoutingModule } from "./route/category-routing.module";
import { ClipboardModule } from "ngx-clipboard";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { CategoriesComponent } from "./list/categories.component";
import { CategoryDetailComponent } from "./detail/category.detail.component";
import { UpdateCategoryComponent } from "./update/update.category.component";


@NgModule({
  imports: [
    CategoryRoutingModule,
    ClipboardModule,
    FormsModule,
    NgbModule,
    NgSelectModule
  ],
  declarations: [
    CategoriesComponent,
    CategoryDetailComponent,
    UpdateCategoryComponent,
  ],
})
export class CategoryModule {}
