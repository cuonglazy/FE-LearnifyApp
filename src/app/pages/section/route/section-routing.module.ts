import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SectionComponent } from "../list/section.component";
import { UpdateSectionComponent } from "../update/update.section.component";
import { SectionRoutingResolveService } from "./section-routing-resolve.service";

const sectionRoutes: Routes = [
  {
    path: "",
    component: SectionComponent,
  },
  {
    path: "new",
    component: UpdateSectionComponent,
  },
  {
    path: ":id/edit",
    component: UpdateSectionComponent,
    resolve: {
      section: SectionRoutingResolveService,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(sectionRoutes)],
  exports: [RouterModule],
})
export class SectionRoutingModule {}
