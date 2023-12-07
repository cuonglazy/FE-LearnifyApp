import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClipboardModule } from "ngx-clipboard";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DiscountComponent } from "./list/discount.component";
import { UpdateDiscountComponent } from "./update/update.discount.component";
import { DiscountRoutingModule } from "./route/discount-routing.module";

@NgModule({
  imports: [
    DiscountRoutingModule, 
    ClipboardModule, 
    FormsModule, 
    NgbModule
  ],
  declarations: [
    DiscountComponent, 
    UpdateDiscountComponent
  ],
})
export class DiscountModule {}
