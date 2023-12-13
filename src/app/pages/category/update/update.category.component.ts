import { FormBuilder, Validators } from "@angular/forms";
import { Category, ICategory } from "../category.model";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, finalize } from "rxjs";
import { HttpResponse } from "@angular/common/http";
import { CategoryService } from "src/app/service/category.service";

@Component({
  selector: "app-update.category",
  templateUrl: "./update.category.component.html",
})
export class UpdateCategoryComponent implements OnInit {
  isSaving = false;
  category: ICategory[] = [];
  selectedCategory: ICategory | null = null;

  editForm = this.fb.group({
    id: [],
    name: ["", [Validators.required]],
    parent_id: [],
    is_delete: [true, [Validators.required]],
  });

  constructor(
    protected fb: FormBuilder,
    protected activatedRouter: ActivatedRoute,
    protected categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.activatedRouter.data.subscribe(({ category }) => {
      if (category === undefined) {
        alert("giá trị của bạn bị undefined");
      }
      this.updateForm(category);
    });
    this.loadData();
  }

  async loadData(): Promise<void> {
    await this.getCategory();
  }

  getCategory(): Promise<void> {
    return new Promise<void>((resolve) => {
      this.categoryService.findAll().subscribe((res) => {
        const categories = res.body
          ? res.body.filter((item) => item.is_delete === true)
          : [];
        this.category = this.buildHierarchy(categories);
        resolve();
      });
    });
  }

  buildHierarchy(categories, parentId = null, level = 0, visited = {}) {
    return categories
      .filter((cat) => cat.parent_id === parentId)
      .map((cat) => {
        if (visited[cat.id]) {
          console.warn("Circular reference detected", cat);
          return null;
        }
        visited[cat.id] = true;
        const children = this.buildHierarchy(
          categories,
          cat.id,
          level + 1,
          visited
        );
        return {
          ...cat,
          level: level,
          children: children,
        };
      })
      .filter((cat) => cat !== null);
  }

  getIndentation(level: number): string {
    return "—".repeat(level);
  }

  updateSelectedCategory(value: string): void {
    this.selectedCategory = this.category.find((item) => item.id === +value);
    this.editForm.patchValue({
      parent_id: this.selectedCategory ? this.selectedCategory.id : null,
    });
  }

  save(): void {
    this.isSaving = true;
    const category = this.createFromForm();
    
    // Kiểm tra xem có parent_id được chọn không
    if (category.parent_id === undefined) {
      category.parent_id = null;
      alert("parent undef")
    }
    
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
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(category: ICategory): void {
    const parentCategory = this.category.find((res) => res.id === category.parent_id);
    const parentIdValue = parentCategory ? parentCategory.id : null;
    console.warn(this.category)
    console.warn(category)
    console.warn(parentCategory)
    console.warn(parentIdValue);
    this.editForm.patchValue({
      id: category.id,
      name: category.name,
      is_delete: category.is_delete,
      parent_id: parentIdValue,
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
      parent_id: parentId !== null ? this.findParentIdByName(parentId) : null,
    };
  }  
  
  private findParentIdByName(parentName: string): number | null {
    const parentCategory = this.category.find((res) => res.name === parentName);
    return parentCategory ? +parentCategory.id : null;
  }
}

