import { Validators } from '@angular/forms';
import { Category, ICategory } from './../../category/category.model';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/service/course.service';
import { Course, ICourse } from '../course.model';
import { Observable, finalize } from 'rxjs';
import { CategoryService } from 'src/app/service/category.service';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environments/environment';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
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
  category: ICategory[];
  selectedCategory: Category;
  uploadProgress: 0;

  constructor(
    private courseService: CourseService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private userService: UserService
  ) {
    this.dataForm = this.formBuilder.group({
      id: [''],
      thumbnail: ['', Validators.required],
      title: [null, Validators.required],
      price: [null, [Validators.required, Validators.min(100)]],
      categoryId: [null],
      userId: [null, [Validators.required]],
      description: [null, Validators.maxLength(255)],
      is_delete: [true],
      imageFile:[null],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ course }) => {
      this.updateForm(course);
    })

    const loggedInUser = this.userService.getUserResponseFromLocalStorage();
    if (loggedInUser) {
      this.dataForm.patchValue({
        userId: loggedInUser.id,
      });
    }
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.findAll().subscribe((res) => {
      console.log('Categories:', res.body);
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
        const grandChildren = this.buildHierarchy(categories, cat.id, level + 2, visited
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

  openFilePicker(event: Event): void {
  event.preventDefault();

  const fileInput: HTMLElement | null = document.getElementById('imageFile');
  if (fileInput) {
    fileInput.click();
  }
}

handleFileInput(files: FileList): void {
  const file = files.item(0);
  const imagePlayer: HTMLImageElement | null = document.getElementById('thumbnail') as HTMLImageElement;

  if (imagePlayer) {
    const fileName = file?.name || 'N/A';
    const url = URL.createObjectURL(file);

    imagePlayer.onload = () => {
      console.log('Thumbnail image loaded successfully');
      this.dataForm.patchValue({
        thumbnail: fileName,
        imageFile: file,
      });

      // Giải phóng tài nguyên
      URL.revokeObjectURL(url);
    };

    imagePlayer.src = url;

    // Reset giá trị của input file để tránh lỗi
    const fileInput: HTMLInputElement | null = document.getElementById('imageFile') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
}

  onFileSelected(imageInput: any): void {
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
    console.log('Dữ liệu khoá học:', course);
  
    const imagePlayer: HTMLImageElement | null = document.getElementById('thumbnail') as HTMLImageElement;
  
    this.thumbnail = [{ thumbnail: course.thumbnail }];
    this.dataForm.patchValue({
      id: course.id,
      thumbnail: course.thumbnail,
      title: course.title,
      price: course.price,
      description: course.description,
      userId: course.userId,
      categoryId: course.categoryId,
      is_delete: course.is_delete,
    });
  
    const url = course.thumbnail;
    if (url) {
      console.log('URL hình thu nhỏ:', url);
      imagePlayer.src = url;
      // imagePlayer.loading; 
    }
  }
  

  protected createFromForm(): ICourse {
    return {
      ...new Course(),
      id: this.dataForm.get(['id'])!.value,
      thumbnail: this.dataForm.get(['thumbnail'])!.value,
      imageFile: this.dataForm.get(['imageFile'])!.value,
      title: this.dataForm.get(['title'])!.value,
      price: this.dataForm.get(['price'])!.value,
      description: this.dataForm.get(['description'])!.value,
      userId: this.dataForm.get(['userId'])!.value,
      categoryId: this.dataForm.get(['categoryId'])!.value,
      is_delete: this.dataForm.get(['is_delete'])!.value,
    };
  }
}
