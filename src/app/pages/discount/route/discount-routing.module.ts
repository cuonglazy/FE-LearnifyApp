import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DiscountComponent } from "../list/discount.component";
import { UpdateDiscountComponent } from "../update/update.discount.component";

const routes: Routes = [
  {
    path: "",
    component: DiscountComponent,
  },
  {
    path: "new",
    component: UpdateDiscountComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscountRoutingModule {}
