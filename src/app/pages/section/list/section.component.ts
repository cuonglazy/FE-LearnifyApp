import { Component, OnInit } from '@angular/core';
import { SectionService } from '../../../service/section.service';
import { Section } from '../section.model';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
})
export class SectionComponent implements OnInit {

  sections: Section[] = [];
  constructor(protected sectionService: SectionService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll():void{
    this.sectionService.findAll().subscribe((res)=>{
      this.sections = res.body ? res.body : [];
    })
  }
}
