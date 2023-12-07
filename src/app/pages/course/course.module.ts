import { NgModule } from '@angular/core';
import { CourseRoutingModule } from './route/course-routing.module';
import { CourseComponent } from './list/course.component';
import { UpdateCourseComponent } from './update/update.course.component';
import { ClipboardModule } from 'ngx-clipboard';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CourseDetailComponent } from './detail/course-detail.component';


@NgModule({
  declarations: [
    CourseComponent,
    UpdateCourseComponent,
    CourseDetailComponent
  ],
  imports: [
    CourseRoutingModule,
    ClipboardModule,
    FormsModule,
    NgbModule,
  ]
})
export class CourseModule { }
