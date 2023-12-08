import { NgModule } from '@angular/core';
import { PaymentRoutingModule } from './route/payment-routing.module';
import { PaymentDetailComponent } from './detail/payment-detail.component';
import { PaymentComponent } from './list/payment.component';
import { UpdateComponent } from './update/update.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';



@NgModule({
  declarations: [
    PaymentDetailComponent,
    PaymentComponent,
    UpdateComponent,
  ],
  imports: [
    PaymentRoutingModule,
    ClipboardModule,
    FormsModule,
    NgbModule,
  ]
})

export class PaymentModule { }
