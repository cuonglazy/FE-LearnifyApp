import { FormBuilder, Validators } from "@angular/forms";
import { Category, ICategory } from "../category.model";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, catchError, finalize, throwError } from "rxjs";
import { HttpResponse } from "@angular/common/http";
import { CategoryService } from "src/app/service/category.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-update.category",
  templateUrl: "./update.category.component.html",
})
export class UpdateCategoryComponent implements OnInit {
  isSaving = false;
  categories: ICategory[] = [];
  selectedCategory: ICategory | null = null;
  isUpdating = false;

  editForm = this.fb.group({
    id: [],
    name: ["", [Validators.required]],
    parent_id: [],
    is_delete: [true, [Validators.required]],
  });

  constructor(
    protected fb: FormBuilder,
    protected activatedRouter: ActivatedRoute,
    protected categoryService: CategoryService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }
  
  async loadData(): Promise<void> {
    await this.getCategory();
    this.activatedRouter.data.subscribe(({ category }) => {
        this.updateForm(category);
    });
  }
  

  getCategory(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.categoryService.findAll().subscribe((res) => {
        const categories = res.body
          ? res.body.filter((item) => item.is_delete === true)
          : [];
        this.categories = this.buildHierarchy(categories);
        resolve();
      });
    });
  }

  buildHierarchy(categories, parentId = null, level = 0, visited = {}) {
    return categories
      .filter((cat) => cat.parent_id === parentId)
      .map((cat) => {
        if (visited[cat.id]) {
          return null;
        }
        visited[cat.id] = true;
        const children = this.buildHierarchy(
          categories,
          cat.id,
          level + 1,
          visited
        );
        const grandChildren = this.buildHierarchy(
          categories,
          cat.id,
          level + 2,
          visited
        );
        return {
          ...cat,
          level: level,
          children: children,
          child: {
            ...cat,
            grandChildren: grandChildren,
          },
        };
      })
      .filter((cat) => cat !== null);
  }

  getIndentation(level: number): string {
    return "—".repeat(level);
  }

  updateSelectedCategory(value: string): void {
    this.selectedCategory = this.categories.find((item) => item.id === +value);
    this.editForm.patchValue({
      parent_id: this.selectedCategory ? this.selectedCategory.id : null,
    });
  }
  

  save(): void {
    this.isSaving = true;
    const category = this.createFromForm();
    if (category.id !== undefined) {
      this.subscribeToSaveResponse(this.categoryService.update(category));
    } else {
      this.subscribeToSaveResponse(this.categoryService.create(category));
    }
  }
  

  previousState(): void {
    window.history.back();
  }

  protected subscribeToSaveResponse(
    result: Observable<HttpResponse<ICategory>>
  ): void {
    result
      .pipe(
        catchError((error) => {
          this.onSaveError(error);
          return throwError(error);
        }),
        finalize(() => this.onSaveFinalize())
      )
      .subscribe({
        next: () => {
          this.toastrService.success("Bạn đã thêm mới category", "Thêm mới thành công!");
          this.onSaveSuccess()
        },
      });
  }
  

  protected onSaveSuccess(): void {
    console.warn('Save success');
    this.previousState();
  }
  
  protected onSaveError(error: any): void {
    console.error('Save error:', error);
    // Xử lý lỗi hoặc log thông báo lỗi.
  }
  
  protected onSaveFinalize(): void {
    console.warn('Save finalize');
    this.isSaving = false;
  }

  protected updateForm(category: ICategory): void {
    const parentCategory = this.findCategoryById(category.parent_id, this.categories);
    
    this.editForm.patchValue({
      id: category.id,
      name: category.name,
      is_delete: category.is_delete,
      parent_id: parentCategory ? parentCategory.id : null,
    });
  }
  
  protected createFromForm(): ICategory {
    const parentId = this.editForm.get("parent_id").value;
    console.warn('Parent ID:', parentId);
    return {
      ...new Category(),
      id: this.editForm.get("id")!.value,
      name: this.editForm.get("name")!.value,
      is_delete: this.editForm.get("is_delete")!.value,
      parent_id: parentId,
    };
  }

  findCategoryById(id: number, categories: ICategory[]): ICategory | null {
    for (let category of categories) {
      if (category.id === id) {
        return category;
      }
      if (category.children) {
        let found = this.findCategoryById(id, category.children);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }
  
}

