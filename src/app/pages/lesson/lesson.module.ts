import { NgModule } from "@angular/core";
import { LessonRoutingModule } from "./route/lesson-routing.module";
import { FormsModule } from "@angular/forms";
import { ClipboardModule } from "ngx-clipboard";
import { LessonComponent } from "./list/lesson.component";
import { UpdateLessonComponent } from "./update/update.lesson.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    LessonComponent, 
    UpdateLessonComponent
  ],
  imports: [
    LessonRoutingModule,
    ClipboardModule,
    FormsModule,
    NgbModule,
  ]
})
export class LessonModule {}
