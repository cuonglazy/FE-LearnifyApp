import { Category, ICategory } from './../../category/category.model';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/service/course.service';
import { Course, ICourse } from '../course.model';
import { Observable, finalize } from 'rxjs';
import { CategoryService } from 'src/app/service/category.service';
 
@Component({
  selector: 'app-update.course',
  templateUrl: './update.course.component.html',
})
export class UpdateCourseComponent implements OnInit {
  isSaving = false;
  dataForm: FormGroup;
  course: ICourse;
  categories: Category[] = [];
  thumbnail: any;
  category: ICategory [];
 
  constructor(
    private courseService: CourseService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
  ) {
    this.dataForm = this.formBuilder.group({
      id: [],
      thumbnail: [],
      title: [],
      price: [],
      description: [],
      category_id: [],
      user_id: [],
      is_delete: [],
    });
  }
 
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({course}) =>{
      this.updateForm(course);
    })
    this.loadCategories();
  }
 
  loadCategories(): void {
    this.categoryService.findAll().subscribe((res) => {
      this.categories = res.body || [];
      this.categories = this.buildHierarchy(res.body || []);
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
        const children = this.buildHierarchy(categories, cat.id, level + 1, visited);
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

  previousState(): void {
    window.history.back();
  }
 
  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICourse>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }
 
  save(): void {
    this.isSaving = true;
    const course = this.createFromForm();
    if (!course.id) {
      this.subscribeToSaveResponse(this.courseService.create(course));
    } else {
      this.subscribeToSaveResponse(this.courseService.update(course));
    }
  }
 
  onDelete(id: number): void {
    this.courseService.delete(id).subscribe((res) =>{
      console.warn('Delete Successfully!', res);
    },
    (error) => {
      console.error('Delete Failed!', error);
    })
  }
 
  onFileSelected(event): void {
    console.log(event)
  }
 
  protected onSaveSuccess(): void {
    this.previousState();
  }
 
  protected onSaveError(): void {
    // Handle error as needed
  }
 
  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(course: ICourse): void {
    this.dataForm.patchValue({
      id: course.id,
      thumbnail: course.thumbnail,
      title: course.title,
      price: course.price,
      description: course.description,
      user_id: course.user_id,
      category_id: course.category_id,
      is_delete: course.is_delete,
    });
  }
 
  protected createFromForm(): ICourse {
    return {
      ...new Course(),
      id: this.dataForm.get(['id'])!.value,
      thumbnail: this.dataForm.get(['thumbnail'])!.value,
      title: this.dataForm.get(['title'])!.value,
      price: this.dataForm.get(['price'])!.value,
      description: this.dataForm.get(['description'])!.value,
      user_id: this.dataForm.get(['user_id'])!.value,
      category_id: this.dataForm.get(['category_id'])!.value,
      is_delete: this.dataForm.get(['is_delete'])!.value,
    };
  }  
}
