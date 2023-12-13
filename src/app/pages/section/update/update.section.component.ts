import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/service/course.service';
import { SectionService } from 'src/app/service/section.service';
import { ICourse } from '../../course/course.model';
import { ISection, Section } from '../section.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { title } from 'process';
import { Observable, finalize } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-update.section',
  templateUrl: './update.section.component.html',
})
export class UpdateSectionComponent implements OnInit {
  isSaving = false;
  dataCourse: ICourse[] = [];
  dataForm: FormGroup;
  
  constructor(protected sectionService: SectionService, private courseService: CourseService, protected formBuilder: FormBuilder, protected activatedRoute: ActivatedRoute) {
    this.dataForm = this.formBuilder.group({
      id: [''],
      quantity_lesson: [''],
      total_minutes: [''],
      title: [null, [Validators.required]],
      resource: [null, [Validators.required]],
      course_id: [null, [Validators.required]],
      is_delete: [true],
    })
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({section}) => {
      this.UpdateFromForm(section);
      console.warn(section);
    })

    this.courseService.findAll().subscribe(res => {
      this.dataCourse = res.body ? res.body : [];
    })
  }

  save(): void {
    const section = this.CreateFromForm();
    console.warn(section);
    if (!section.id) {
      this.subscribeToSaveResponse(this.sectionService.create(section));
    } else {
      this.subscribeToSaveResponse(this.sectionService.update(section));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISection>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    })
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  previousState(): void {
    window.history.back();
  }

  protected onSaveError(): void {
  }

  UpdateFromForm(section : ISection):void{
    this.dataForm.patchValue({
      id: section.id,
      title: section.title,
      quantity_lesson: section.quantity_lesson,
      total_minutes: section.total_minutes,
      resource: section.resource,
      course_id: section.course_id,
      is_delete: section.is_delete
    })
    console.warn(this.dataForm);    
  }

  CreateFromForm(): ISection{
    return {
      ...new Section(),
      id: this.dataForm.get(['id'])!.value,
      title: this.dataForm.get(['title'])!.value,
      quantity_lesson: this.dataForm.get(['quantity_lesson'])!.value,
      total_minutes: this.dataForm.get(['total_minutes'])!.value,
      resource: this.dataForm.get(['resource'])!.value,
      course_id: this.dataForm.get(['course_id'])!.value,
      is_delete: this.dataForm.get(['is_delete'])!.value,
    }
  }
}
