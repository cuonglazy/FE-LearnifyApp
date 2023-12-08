import { NgModule } from "@angular/core";
import { ClipboardModule } from "ngx-clipboard";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DiscountComponent } from "./list/discount.component";
import { UpdateDiscountComponent } from "./update/update.discount.component";
import { DiscountRoutingModule } from "./route/discount-routing.module";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [DiscountRoutingModule,ReactiveFormsModule, ClipboardModule, FormsModule, NgbModule, CommonModule],
  declarations: [DiscountComponent, UpdateDiscountComponent],
})
export class DiscountModule {}
