import { Component, OnDestroy, OnInit } from "@angular/core";
import { CategoryService } from "../../../service/category.service";
import { Category, ICategory } from "../category.model";
import { HttpResponse } from "@angular/common/http";
import { FormBuilder, FormGroup } from "@angular/forms";
import { map, of, take } from "rxjs";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
})
export class CategoriesComponent implements OnInit {
  categories: ICategory[] = [];
  allCategory: ICategory[] = [];
  totalItems: number;
  itemsPerPage: number = 10;
  page: number = 1;
  displayPage: number = 1;
  totalPages: number;
  searchForm: FormGroup;

  constructor(
    protected categoryService: CategoryService,
    private formBuilder: FormBuilder,
  ) {
    this.searchForm = this.formBuilder.group({
      keyword: [""],
      page:  [0],
      size: [10],
    });
  }
  ngOnInit(): void {
    this.searchAllPages();
  }
  
  async searchAllPages(): Promise<void> {
    let page = 0;
    let totalPages = 1;

    while (page < totalPages) {
      this.searchForm.patchValue({ page: page });
      await this.loadPage();
      page++;
    }
  }

  loadPage(): Promise<void> {
    return new Promise<void>((resolve) => {
      const formValue = this.searchForm.value;
      this.categoryService.findAllPage(formValue).pipe(
        map((res: HttpResponse<any>) => {
          this.totalItems = Number(res.headers.get('X-Total-Count'));
          this.page = formValue.page;
          if (res.body) {
            this.totalPages = res.body['totalPages'];
            this.categories = res.body['categories'] ? res.body['categories'] : [];
            this.allCategory = this.allCategory.concat(this.categories);
  
            this.categories.forEach((category) => {
              if (category.parent_id) {
                const parentCategory = this.allCategory.find(
                  (c) => c.id === category.parent_id
                );
                if (parentCategory) {
                  category.parentName = parentCategory.name;
                }
              }
            });
          }
          resolve();
          return null;
        })
      ).subscribe();
    });
  }
  
  getPageArray(): number[] {
    const pages = [];
    for (let i = 0; i < 3; i++) {
      const page = this.displayPage + i;
      if (page <= this.totalPages) {
        pages.push(page);
      }
    }
    return pages;
  }
  
  navigateToPage(newPage: number): void {
    let pageToRequest = newPage;
    if (newPage === 1 && this.displayPage > 0) {
      pageToRequest = 0;
    }
  
    this.searchForm.patchValue({ page: pageToRequest });
    this.displayPage = pageToRequest;
    this.loadPage();
  }  

  onDelete(id: number): void {
    if (this.categories.length > 0 && confirm("Bạn có chắc chắn muốn xóa danh mục này không?")) {
      this.categoryService.delete(id).subscribe(
        (res) => {
          alert("Xóa Thành Công");
          this.loadPage();
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
}