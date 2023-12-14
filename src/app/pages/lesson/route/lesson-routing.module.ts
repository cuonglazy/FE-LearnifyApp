import { LessonComponent } from './../list/lesson.component';
import { UpdateLessonComponent } from '../update/update.lesson.component';
import { LessonDetailComponent } from '../detail/lesson-detail.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LessonRoutingResolveService } from './lesson-routing.resolve.service';

const lessonRoutes: Routes = [
  {
    path: "",
    component: LessonComponent,
  },
  {
    path: "new",
    component: UpdateLessonComponent,
  },
  {
    path: ":id/edit",
    component: UpdateLessonComponent,
    resolve:{
      lesson: LessonRoutingResolveService,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(lessonRoutes)],
  exports: [RouterModule],
})
export class LessonRoutingModule {}
