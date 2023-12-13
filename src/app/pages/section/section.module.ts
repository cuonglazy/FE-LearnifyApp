import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SectionComponent } from "./list/section.component";
import { SectionDetailComponent } from "./detail/section.detail.component";
import { ClipboardModule } from "ngx-clipboard";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SectionRoutingModule } from "./route/section-routing.module";
import { UpdateSectionComponent } from "./update/update.section.component";

@NgModule({
  declarations: [
    SectionComponent,
    SectionDetailComponent,
    UpdateSectionComponent,
  ],
  imports: [
    ClipboardModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SectionRoutingModule,
    CommonModule,
  ],
})
export class SectionModule {}
