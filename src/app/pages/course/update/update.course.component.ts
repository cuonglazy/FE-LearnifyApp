import { CategoryService } from 'src/app/service/category.service';
import { Category } from './../../category/category.model';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/service/course.service';
import { Course, ICourse } from '../course.model';
import { Observable, finalize } from 'rxjs';

@Component({
  selector: 'app-update.course',
  templateUrl: './update.course.component.html',
})
export class UpdateCourseComponent implements OnInit {
  [x: string]: any;
onFileSelected($event: any) {
}
  isSaving = false;
  dataForm: FormGroup;
  thumbnail: any;
  course: ICourse;
  categories: Category[] = [];

  constructor(
    private courseService: CourseService,
    protected formbuilder: FormBuilder,
    protected ActivatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
  ) { 
    this.dataForm = this.formbuilder.group ({
      id: [''],
      thumbnailPath: [],
      title: [],
      price: [''],
      description: [],
      category_name: [],
      user_name: [],
      isActive: [true],
    })
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.findAllCategory().subscribe((res) => {
      this.categories = res.body ? res.body : [];
    });
  }
  

  previousState(): void {
    window.history.back();
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICourse>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    })
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  save(): void {
    const course = this.createFromform();
    if (!course.id !== undefined) {
      // this.subscribeToSaveResponse(this.courseService.update(course));
    } else {
      this.subscribeToSaveResponse(this.courseService.create(course));
    }
  }

  protected updateForm(course: ICourse): void {
    this.dataForm.patchValue({
      id: course.id,
      thumbnail: course.thumbnail,
      title: course.title,
      price: course.price,
      user_name: course.user_name,
      category_name: course.category_name,
      isActive: course.isActive
    })
  }

  protected createFromform(): ICourse {
    return {
      ...new Course(),
      id: this.dataForm.get(['id'])!.value,
      thumbnail: this.dataForm.get(['thumbnail'])!.value,
      title: this.dataForm.get(['title'])!.value,
      price: this.dataForm.get(['price'])!.value,
      user_name: this.dataForm.get(['user_name'])!.value,
      category_name: this.dataForm.get(['category_name'])!.value,
      isActive: this.dataForm.get(['isActive'])!.value,
    };
  }
}
