import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Discount, IDiscount } from '../discount.model';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { DiscountService } from 'src/app/service/discount.service';

@Component({
  selector: 'app-update.discount',
  templateUrl: './update.discount.component.html',
})
export class UpdateDiscountComponent implements OnInit {
  selectedStatus: any;
  isSaving = false;
  dataForm: FormGroup;
  discount: any;
  constructor(private dataService: DiscountService, protected formBuilder: FormBuilder, protected activatedRoute: ActivatedRoute) {
    this.dataForm = this.formBuilder.group({
    id: [''],
    code: [null, [Validators.required, this.noWhiteSpacesValidator, Validators.minLength(3), Validators.maxLength(10)]],
    percentage: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
    startDate: [null, [Validators.required]],
    startEnd: [null, [Validators.required]],
    isActive: [true],
    },{
      validator: this.dateRangeValidator('startDate', 'startEnd')
    })
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ discount }) => {
      this.updateForm(discount);
      this.discount = discount;
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
    const discount = this.createFromform();
    if (!discount.id) {
      this.subscribeToSaveResponse(this.dataService.create(discount));
    } else {
      this.subscribeToSaveResponse(this.dataService.update(discount));
    }
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

  protected updateForm(discount: IDiscount): void {
    this.dataForm.patchValue({
      id: discount.id,
      code: discount.code,
      percentage: discount.percentage,
      startDate: discount.startDate,
      startEnd: discount.startEnd,
      isActive: discount.isActive
    })
  }

  protected createFromform(): IDiscount {
    return {
      ...new Discount(),
      id: this.dataForm.get(['id'])!.value,
      code: this.dataForm.get(['code'])!.value,
      percentage: this.dataForm.get(['percentage'])!.value,
      startDate: this.dataForm.get(['startDate'])!.value,
      startEnd: this.dataForm.get(['startEnd'])!.value,
      isActive: this.dataForm.get(['isActive'])!.value,
    };
  }
}