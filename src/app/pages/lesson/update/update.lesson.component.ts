import { Component, OnInit } from '@angular/core';
import { SectionService } from 'src/app/service/section.service';
import { ISection } from '../../section/section.model';
import { LessonService } from 'src/app/service/lesson.service';
import { ILesson, Lesson } from '../lesson.model';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-update.lesson',
  templateUrl: './update.lesson.component.html',
})
export class UpdateLessonComponent implements OnInit {
  isSaving = false;
  section: ISection[] = [];
  lesson: ILesson[] = [];

  editForm = this.fb.group({
    id: [],
    title: ["", [Validators.required]],
    time: ["", [Validators.required]],
    video_url: ["", [Validators.required]],
    section_id: [],
  })

  constructor(protected sectionService: SectionService, protected lessonService: LessonService, protected fb: FormBuilder, private datePipe: DatePipe ,protected activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllSections();
    this.activatedRouter.data.subscribe(({ lesson }) => {
      this.updateForm(lesson);
  });
  }
  
  getAllSections(): void {
    this.sectionService.findAll().subscribe(res => {
      this.section = res.body ? res.body : [];
    })
  }

  save(): void{
    this.isSaving = true;
    const lesson = this.createFromForm();
    if(lesson.id !== undefined){
      this.subscribeToSaveResponse(this.lessonService.update(lesson))
    }else{
      return null;
    }
  }
  previousState(): void {
    window.history.back();
  }
  
  protected subscribeToSaveResponse(
      result: Observable<HttpResponse<ILesson>>
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
          next: () => this.onSaveSuccess(),
        });
    }
  

    protected onSaveSuccess(): void {
      this.previousState();
    }
    
    protected onSaveError(error: any): void {
      // Xử lý lỗi hoặc log thông báo lỗi.
    }
    
    protected onSaveFinalize(): void {
      this.isSaving = false;
    }

    openFilePicker(): void {
      const fileInput: HTMLElement = document.getElementById('video-file');
      fileInput.click();
    }
    
    handleFileInput(files: FileList) {
      const file = files.item(0);
      const videoPlayer: HTMLVideoElement = document.getElementById('video-player') as HTMLVideoElement;
      const videoSource: HTMLSourceElement = document.getElementById('video-source') as HTMLSourceElement;
    
      // Tạo URL cho tệp video và gán nó vào nguồn video
      const url = URL.createObjectURL(file);
      videoSource.src = url;
    
      // Cập nhật video player
      videoPlayer.load();
    
      // Đọc thời lượng video khi dữ liệu đầu tiên của video đã được tải
      videoPlayer.onloadeddata = () => {
         console.log('Video Duration:', videoPlayer.duration);
    
         // Đặt giá trị cho FormControl "time" trong editForm
         this.editForm.patchValue({
            time: this.secondsToHms(videoPlayer.duration)
         });
      };
   }
   
    secondsToHms(d: number) {
      const h = Math.floor(d / 3600);
      const m = Math.floor(d % 3600 / 60);
      const s = Math.floor(d % 3600 % 60);
    
      const hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " giờ, ") : "";
      const mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " phút, ") : "";
      const sDisplay = s > 0 ? s + (s === 1 ? " second" : " giây") : "";
      return hDisplay + mDisplay + sDisplay; 
    }
  
  protected updateForm(lesson: ILesson): void{
    this.editForm.patchValue({
      id: lesson.id,
      title: lesson.title,
      time: lesson.time,
      video_url:lesson.video_url,
      section_id: lesson.section_id,
    });
    const videoPlayer: HTMLVideoElement = document.getElementById('video-player') as HTMLVideoElement;
    const videoSource: HTMLSourceElement = document.getElementById('video-source') as HTMLSourceElement;
    
    // Cập nhật video player với đường dẫn video từ lesson
    const url = lesson.video_url;
    if (url) {
       videoSource.src = url;
       videoPlayer.load();
    }
  }
  
  protected createFromForm(): ILesson {
    return {
      ... new Lesson(),
      id: this.editForm.get("id")!.value,
      title: this.editForm.get("title")!.value,
      time: this.editForm.get("time")!.value,
      video_url: this.editForm.get("video_url")!.value,
      section_id: this.editForm.get("section_id")!.value,
    }
  }
}
