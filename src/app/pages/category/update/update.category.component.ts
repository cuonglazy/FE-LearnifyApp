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
        let categories = res.body
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
        let children = this.buildHierarchy(
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
  }

  save(): void {
    this.isSaving = true;
    const category = this.createFromForm();
    category.parent_id = this.editForm.get('parent_id').value;
    if (category.id !== undefined) {
      this.subscribeToSaveResponse(this.categoryService.create(category));
    } else {
      this.subscribeToSaveResponse(this.categoryService.update(category));
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
    const cate = this.category.find((res) => res.id === category.id);
    const nameCate = this.category.find((res) => (res.id = cate.parent_id));
    const parentIdValue = nameCate ? { id: nameCate.id, name: nameCate } : null;

    this.editForm.patchValue({
      id: category.id,
      name: category.name,
      is_delete: category.is_delete,
      parent_id: parentIdValue,
    });
    console.warn(name)
  }

  protected createFromForm(): ICategory {
    const parentIdObject = this.editForm.get(["parent_id"])!.value;
    const parentId = parentIdObject ? parentIdObject.id : null;
    return {
      ...new Category(),
      id: this.editForm.get(["id"])!.value,
      name: this.editForm.get(["name"])!.value,
      is_delete: this.editForm.get(["is_delete"])!.value,
      parent_id: parentId as number,
    };
  }
}
