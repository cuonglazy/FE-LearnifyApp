import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update.discount',
  templateUrl: './update.discount.component.html',
})
export class UpdateDiscountComponent implements OnInit {
  [x: string]: any;

  selectedCategory: number;
  selectedCourse: number;
  selectedStatus: any;

  constructor() { }

  ngOnInit(): void {
  }

}
