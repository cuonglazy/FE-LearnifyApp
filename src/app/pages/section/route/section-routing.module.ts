import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SectionComponent } from "../list/section.component";
import { UpdateSectionComponent } from "../update/update.section.component";

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
  },
];

@NgModule({
  imports: [RouterModule.forChild(sectionRoutes)],
  exports: [RouterModule],
})
export class SectionRoutingModule {}
