import { Component, OnInit } from "@angular/core";
import { CategoryService } from "../../../service/category.service";
import { Category } from "../category.model";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
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
      this.categories.forEach(category => {
        if (category.parent_id) {
          const parentCategory = this.categories.find(c => c.id === category.parent_id);
          if (parentCategory) {
            category.parentName = parentCategory.name;
          }
          return category.parentName
        }
      });
    });
  }

}

