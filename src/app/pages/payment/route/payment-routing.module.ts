import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from '../list/payment.component';
import { UpdateComponent } from '../update/update.component';
import { PaymentDetailComponent } from '../detail/payment-detail.component';

const routes: Routes = [
  {
    path: "",
    component: PaymentComponent,
  },
  {
    path: "new",
    component: UpdateComponent,
  },
  {
    path: ":id/view",
    component: PaymentDetailComponent,
  },
  {
    path: ":id/edit",
    component: UpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
