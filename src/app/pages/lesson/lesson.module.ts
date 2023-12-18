import { NgModule } from "@angular/core";
import { LessonRoutingModule } from "./route/lesson-routing.module";
import { ClipboardModule } from "ngx-clipboard";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LessonComponent } from "./list/lesson.component";
import { UpdateLessonComponent } from "./update/update.lesson.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LessonDetailComponent } from './detail/lesson-detail.component';
import { CommonModule, DatePipe } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";

@NgModule({
  declarations: [
    LessonComponent, 
    UpdateLessonComponent, LessonDetailComponent
  ],
  imports: [
    CommonModule,
    LessonRoutingModule,
    ClipboardModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ToastrModule
  ],
  providers: [DatePipe],
})
export class LessonModule {}
