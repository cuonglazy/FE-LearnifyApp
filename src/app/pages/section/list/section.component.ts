import { Component, OnInit } from '@angular/core';
import { SectionService } from '../../service/section.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  constructor(protected sectionService: SectionService) { }

  ngOnInit(): void {
  }

}
