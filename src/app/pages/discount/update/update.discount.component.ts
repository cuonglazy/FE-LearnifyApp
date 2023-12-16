import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Discount, IDiscount } from '../discount.model';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Observable, finalize, map } from 'rxjs';
import { DiscountService } from 'src/app/service/discount.service';
import { CourseService } from 'src/app/service/course.service';
import { ICourse } from '../../course/course.model';
import { resolve } from 'path';

@Component({
  selector: 'app-update.discount',
  templateUrl: './update.discount.component.html',
})
export class UpdateDiscountComponent implements OnInit {
  selectedStatus: any;
  isSaving = false;
  dataForm: FormGroup;
  dataFormDC: FormGroup;
  discount: any;
  course: ICourse[] = [];
  discountCourses: any;
  dataFindOne: any;

  constructor(private dataService: DiscountService, private courseService: CourseService,protected formBuilder: FormBuilder, protected activatedRoute: ActivatedRoute) {
    this.dataForm = this.formBuilder.group({
    id: [''],
    code: [null, [Validators.required, this.noWhiteSpacesValidator, Validators.minLength(3), Validators.maxLength(20)]],
    percentage: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
    startDate: [null, [Validators.required]],
    startEnd: [null, [Validators.required]],
    isActive: [true],
    },{
      validator: this.dateRangeValidator('startDate', 'startEnd')
    })
    this.dataFormDC = this.formBuilder.group({
      id: [''],
      course_id: [''],
      discount_id: [''],
      is_delete: ['']
    })
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((discount) => {
      this.updateFromForm(discount);
      this.discountCourses = discount.discountCourses;
      this.discount = discount.discountCourses;

      this.courseService.findAll().subscribe((res)=>{
        const dataCourse = res.body ? res.body : [];
        this.course = res.body ? res.body : [];

        const courseNameMap: { [id: number]: string } = {};
        res.body.forEach((course) =>{
          courseNameMap[course.id] = course.title;
        })

        this.discountCourses.forEach((course) => {
          course.nameCourse = courseNameMap[course.course_id];
          course.nameDiscount = discount.code
        });

        const courseIdsToRemove = discount.discountCourses.map(course => course.course_id);
        const updatedCourses = dataCourse.filter(course => !courseIdsToRemove.includes(course.id));
        this.course = updatedCourses;

      })
    })
  }

  previousState(): void {
    window.history.back();
  }

  noWhiteSpacesValidator(control: FormControl) {
    if (control.value && control.value.trim() === '') {
      return { whitespace: true };
    }
    return null;
  }

  dateRangeValidator(startKey: string, endKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      const startControl = group.get(startKey);
      const endControl = group.get(endKey);

      if (!startControl || !endControl) {
        return null;
      }

      const startDate = new Date(startControl.value);
      const startEnd = new Date(endControl.value);

      if (startDate > startEnd) {
        endControl.setErrors({ dateRange: true });
      } else {
        endControl.setErrors(null);
      }

      return null;
    };
  }

  save(): void {
    const discount = this.createFromForm();
    if (!discount.id) {
      this.subscribeToSaveResponse(this.dataService.create(discount));
    } else {
      this.subscribeToSaveResponse(this.dataService.update(discount));
    }
  }

  saveDC(discount:number ,course:number,deletee: boolean):void {
    const discount_id = discount;const course_id = course;
    const is_delete = deletee;

    const result = {
      discount_id,
      course_id,
      is_delete
    };
    this.dataService.createDiscountCourse(result).subscribe(()=>{})
    console.warn("save tc");
  }

  onCheckboxChange(id: number, is_delete: boolean) {
    console.log(`Item ID: ${id}, Is Checked: ${is_delete}`);
    this.dataService.updateIsDelete(id,is_delete).subscribe(() =>{
    })
  }
  
  onDelete(id: number): void {
    this.dataService.deleteDiscountCourse(id).subscribe(
      (response) => {
        console.warn('Xóa thành công', response);
      },
      (error) => {
        console.error('Lỗi khi xóa', error);
      }
    );
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDiscount>>): void {
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

  protected updateFromForm(discount: IDiscount): void {
    this.dataFormDC.patchValue({
      id: discount.id,
      discount_id: discount.code
    })
    
    this.dataForm.patchValue({
      id: discount.id,
      code: discount.code,
      percentage: discount.percentage,
      startDate: discount.startDate,
      startEnd: discount.startEnd,
      isActive: discount.isActive
    })
  }

  createFromForm(): IDiscount {
    return {
      ...new Discount(),
      id: this.dataForm.get(['id'])!.value,
      code: this.dataForm.get(['code'])!.value,
      percentage: this.dataForm.get(['percentage'])!.value,
      startDate: this.dataForm.get(['startDate'])!.value,
      startEnd: this.dataForm.get(['startEnd'])!.value,
      isActive: this.dataForm.get(['isActive'])!.value,
      discountCourses: this.discountCourses
    };
  }
}