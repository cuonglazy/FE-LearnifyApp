import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LessonComponent } from "../list/lesson.component";

const lessonRoutes: Routes = [
  {
    path: "",
    component: LessonComponent,
  },
  {
    path: "new",
    component: LessonComponent,
  },
  {
    path: ":id/edit",
    component: LessonComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(lessonRoutes)],
  exports: [RouterModule],
})
export class LessonRoutingModule {}
