import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update.category',
  templateUrl: './update.category.component.html',
  styleUrls: ['./update.category.component.scss']
})
export class UpdateCategoryComponent implements OnInit {
[x: string]: any;

  selectedCategory: number;
  selectedCourse: number;
  selectedStatus: any;

  constructor() { }

  ngOnInit(): void {
  }

  previousState(): void {
    window.history.back();
}

}
