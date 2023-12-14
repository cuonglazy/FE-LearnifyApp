import { Component, OnInit } from '@angular/core';
import { SectionService } from 'src/app/service/section.service';
import { ISection } from '../../section/section.model';
import { LessonService } from 'src/app/service/lesson.service';
import { ILesson, Lesson } from '../lesson.model';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-update.lesson',
  templateUrl: './update.lesson.component.html',
})
export class UpdateLessonComponent implements OnInit {

  section: ISection[] = [];
  lesson: ILesson[] = [];

  editForm = this.fb.group({
    id: [],
    title: ["", [Validators.required]],
    time: ["", [Validators.required]],
    video_url: ["", [Validators.required]],
    section_id: [],
  })

  constructor(protected sectionService: SectionService, protected lessonService: LessonService, protected fb: FormBuilder, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getAllSections();
  }
  
  getAllSections(): void {
    this.sectionService.findAll().subscribe(res => {
      this.section = res.body ? res.body : [];
    })
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
