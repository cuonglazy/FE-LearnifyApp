import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentRoutingModule } from './route/payment-routing.module';
import { PaymentDetailComponent } from './detail/payment-detail.component';



@NgModule({
  declarations: [
    PaymentDetailComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule
  ]
})
export class PaymentModule { }
