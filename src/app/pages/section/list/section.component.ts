import { Component, OnInit } from '@angular/core';
import { SectionService } from '../../../service/section.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
})
export class SectionComponent implements OnInit {

  constructor(protected sectionService: SectionService) { }

  ngOnInit(): void {
  }

}
