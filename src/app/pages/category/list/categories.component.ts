import { Component, OnInit } from "@angular/core";
import { CategoryService } from "../../../service/category.service";
import { Category } from "../category.model";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"],
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  constructor(protected categoryService: CategoryService) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.categoryService.findAll().subscribe((res) => {
      this.categories = res.body ? res.body : [];
    });
  }
}
