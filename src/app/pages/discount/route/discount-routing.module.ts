import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DiscountComponent } from "../list/discount.component";
import { UpdateDiscountComponent } from "../update/update.discount.component";
import { DiscountDetailComponent } from "../detail/discount-detail.component";

const routes: Routes = [
  {
    path: "",
    component: DiscountComponent,
  },
  {
    path: "new",
    component: UpdateDiscountComponent,
  },
  {
    path: "id/view",
    component: DiscountDetailComponent,
  },
  {
    path: "id/update",
    component: UpdateDiscountComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscountRoutingModule {}
