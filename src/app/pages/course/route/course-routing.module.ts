import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from '../list/course.component';
import { UpdateCourseComponent } from '../update/update.course.component';
import { CourseRoutingResolveService } from './course-routing-resolve.service';

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
    path: ":id/edit",
    component: UpdateCourseComponent,
    resolve: {
      course: CourseRoutingResolveService,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }