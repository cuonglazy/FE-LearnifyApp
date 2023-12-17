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
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-update.lesson',
  templateUrl: './update.lesson.component.html',
})
export class UpdateLessonComponent implements OnInit {
  isSaving = false;
  section: ISection[] = [];
  lesson: ILesson[] = [];
  uploadProgress: 0;

  editForm = this.fb.group({
    id: [],
    title: ["", [Validators.required]],
    time: [],
    video_url: ["", [Validators.required]],
    sectionId: [],
    videoFile: [null],
  })

  constructor(protected sectionService: SectionService,private toastrService: ToastrService, protected lessonService: LessonService, protected fb: FormBuilder, private datePipe: DatePipe ,protected activatedRouter: ActivatedRoute) { }

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

  save(): void {
    this.isSaving = true;
    const lesson = this.createFromForm();
    
    // Chuyển đổi thời gian từ hh:mm:ss thành số giây
    if (typeof lesson.time === 'string') {
      lesson.time = this.parseTimeStringToSeconds(lesson.time);
    }

    if (lesson.id != null &&lesson.id !== undefined) {
      this.uploadProgress = 0; 
      this.subscribeToSaveResponse(this.lessonService.update(lesson));
    } else {
      this.uploadProgress = 0; 
      this.subscribeToSaveResponse(this.lessonService.create(lesson));
    }
  }
  
  openFilePicker(event: Event): void {
    event.preventDefault(); // Ngăn chặn sự kiện mặc định của nút "Chọn"
  
    const fileInput: HTMLElement = document.getElementById('videoFile');
    fileInput.click();
  }
  
  handleFileInput(files: FileList) {
    const file = files.item(0);
    const videoPlayer: HTMLVideoElement = document.getElementById('video-player') as HTMLVideoElement;
    const videoSource: HTMLSourceElement = document.getElementById('video_url') as HTMLSourceElement;
    // Lấy tên tệp
    const fileName = file?.name || 'N/A';
    // Tạo URL cho tệp video và gán nó vào nguồn video
    const url = URL.createObjectURL(file);
    videoSource.src = url;
    // Cập nhật video player
    videoPlayer.load();
  
    // Đọc thời lượng video khi dữ liệu đầu tiên của video đã được tải
    videoPlayer.onloadeddata = () => {
  
      // Chuyển đổi thời gian từ định dạng hh:mm:ss thành chuỗi
      const timeAsString = this.secondsToHms(Math.floor(videoPlayer.duration));
  
      // Hiển thị giờ phút giây cho người dùng
      this.editForm.patchValue({
        time: timeAsString,
        video_url: fileName,
        videoFile: file,
      });
    };
  
    // Reset giá trị của input file để tránh lỗi
    const fileInput: HTMLInputElement = document.getElementById('videoFile') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  // chuyển đổi time string thành number 
  parseTimeStringToSeconds(timeString: string): number {
    // Sử dụng biểu thức chính quy để phân tích chuỗi thời gian
    const timeArray: string[] = timeString.split(', ');
  let totalSeconds = 0;

  timeArray.forEach((timePart) => {
    const value = parseInt(timePart, 10);
    if (timePart.includes("giờ")) {
      totalSeconds += value * 3600;
    } else if (timePart.includes("phút")) {
      totalSeconds += value * 60;
    } else if (timePart.includes("giây")) {
      totalSeconds += value;
    }
  });

  return totalSeconds;
  }
  
  // Chuyển đổi giây thành chuỗi hh:mm:ss
  secondsToHms(d: number | string): string {
    if (typeof d !== 'number') {
      return d.toString(); // Không cần chuyển đổi
    }
    const h = Math.floor(d / 3600);
    const m = Math.floor(d % 3600 / 60);
    const s = Math.floor(d % 3600 % 60);
  
    const hDisplay = h > 0 ? h + (h === 1 ? " hour, " : " giờ, ") : "";
    const mDisplay = m > 0 ? m + (m === 1 ? " minute, " : " phút, ") : "";
    const sDisplay = s > 0 ? s + (s === 1 ? " second" : " giây") : "";
    return hDisplay + mDisplay + sDisplay;
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
            finalize(() => {
              this.onSaveFinalize();
              this.toastrService.success("Success!", "Thêm mới thành công!");
            })
          )
          .subscribe({
            next: () => {
              this.toastrService.success("Success!", "Thêm mới thành công!");
              this.onSaveSuccess();
            },
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
      protected updateForm(lesson: ILesson): void{
        const videoPlayer: HTMLVideoElement = document.getElementById('video-player') as HTMLVideoElement;
        const videoSource: HTMLSourceElement = document.getElementById('video_url') as HTMLSourceElement;
        const timeAsString = this.secondsToHms(lesson.time);
        this.editForm.patchValue({
          id: lesson.id,
          title: lesson.title,
          time: timeAsString,
          video_url:lesson.video_url,
          sectionId: lesson.sectionId,
    });
    
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
      sectionId: this.editForm.get("sectionId")!.value,
      videoFile: this.editForm.get("videoFile")!.value,
    }
  }
}
