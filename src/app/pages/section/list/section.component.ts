import { Component, OnInit } from '@angular/core';
import { SectionService } from '../../../service/section.service';
import { ISection } from '../section.model';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
})
export class SectionComponent implements OnInit {
  
  dataSections: ISection [] = [];
  constructor(protected sectionService: SectionService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll():void{
    this.sectionService.findAll().subscribe((res)=>{
      this.dataSections = res.body ? res.body : [];
    })
  }
}
