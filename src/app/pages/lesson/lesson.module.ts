import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LessonRoutingModule } from "./route/lesson-routing.module";
import { ClipboardModule } from "ngx-clipboard";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { LessonComponent } from "./list/lesson.component";
import { UpdateLessonComponent } from "./update/update.lesson.component";

@NgModule({
  declarations: [LessonComponent, UpdateLessonComponent],
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
