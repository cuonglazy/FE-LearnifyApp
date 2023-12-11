import { Component, OnDestroy, OnInit } from "@angular/core";
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

  onDelete(id: number): void {
    if (confirm("Bạn có chắc chắn muốn xóa danh mục này không?")) {
      this.categoryService.delete(id).subscribe(
        (res) => {
          alert("Xóa Thành Công");
          this.findAll();
        },
        (error) => {
          if (error.status === 403) {
            alert("Bạn không có quyền xóa danh mục này");
          } else {
            alert("Xóa Lỗi");
          }
        }
      );
    }
  }

  findAll() {
    this.categoryService.findAll().subscribe((res) => {
      this.categories = res.body ? res.body : [];
      this.categories.forEach((category) => {
        if (category.parent_id) {
          const parentCategory = this.categories.find(
            (c) => c.id === category.parent_id
          );
          if (parentCategory) {
            category.parentName = parentCategory.name;
          }
          return category.parentName;
        }
      });
    });
  }
}
