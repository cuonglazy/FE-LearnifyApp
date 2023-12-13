import { Component, OnInit } from '@angular/core';
import { SectionService } from 'src/app/service/section.service';

@Component({
  selector: 'app-update.lesson',
  templateUrl: './update.lesson.component.html',
})
export class UpdateLessonComponent implements OnInit {
selectedStatus: any;
selectedSection: any;

  constructor(private sectionService: SectionService) { }
  dataSection: any;
  ngOnInit(): void {
    this.getAllSections();
  }

  getAllSections(): void {
    this.sectionService.findAll().subscribe(res => {
      this.dataSection = res.body ? res.body : [];
    })
  }
}
