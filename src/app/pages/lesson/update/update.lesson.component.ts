import { Component, OnInit } from '@angular/core';
import { SectionService } from 'src/app/service/section.service';
import { ISection } from '../../section/section.model';
import { LessonService } from 'src/app/service/lesson.service';

@Component({
  selector: 'app-update.lesson',
  templateUrl: './update.lesson.component.html',
})
export class UpdateLessonComponent implements OnInit {

  section: ISection[] = [];

  constructor(protected sectionService: SectionService, protected lessonService: LessonService ) { }

  ngOnInit(): void {
    this.getAllSections();
  }

  getAllSections(): void {
    this.sectionService.findAll().subscribe(res => {
      this.section = res.body ? res.body : [];
    })
  }
}
