import { NgModule } from "@angular/core";
import { LessonRoutingModule } from "./route/lesson-routing.module";
import { ClipboardModule } from "ngx-clipboard";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LessonComponent } from "./list/lesson.component";
import { UpdateLessonComponent } from "./update/update.lesson.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LessonDetailComponent } from './detail/lesson-detail.component';
import { CommonModule } from "@angular/common";

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
  ],
})
export class LessonModule {}
