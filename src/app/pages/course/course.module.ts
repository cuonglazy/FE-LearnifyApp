import { NgModule } from '@angular/core';
import { CourseRoutingModule } from './route/course-routing.module';
import { CourseComponent } from './list/course.component';
import { UpdateCourseComponent } from './update/update.course.component';
import { ClipboardModule } from 'ngx-clipboard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CourseDetailComponent } from './detail/course-detail.component';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule,
    CourseRoutingModule,
    ClipboardModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CourseComponent,
    UpdateCourseComponent,
    CourseDetailComponent
  ],
})
export class CourseModule { }
