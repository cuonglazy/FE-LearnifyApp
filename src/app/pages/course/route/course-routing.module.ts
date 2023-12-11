import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from '../list/course.component';
import { UpdateCourseComponent } from '../update/update.course.component';
import { CourseDetailComponent } from '../detail/course-detail.component';

const routes: Routes = [
  {
    path: "",
    component: CourseComponent,
  },
  {
    path: "new",
    component: UpdateCourseComponent,
  },
  {
    path: ":id/view",
    component: CourseDetailComponent,
  },
  {
    path: ":id/edit",
    component: UpdateCourseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }