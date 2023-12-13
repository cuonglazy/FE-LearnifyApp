import { Component, OnInit } from '@angular/core';
import { SectionService } from '../../../service/section.service';
import { ISection } from '../section.model';
import { CourseService } from 'src/app/service/course.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
})
export class SectionComponent implements OnInit {
  itemIdToDelete: number;
  dataSection: ISection[] = [];
  dataSectionOrigin: ISection[] = [];
  dataCourse: any[] = [];
  dataForm: FormGroup;
  constructor(protected sectionService: SectionService,protected courseService: CourseService,protected fb: FormBuilder) {
    this.dataForm = this.fb.group({
      searchTitle: [''] 
    });
   }

  ngOnInit(): void {
    this.getAll();
    this.getAllCourse();
  }

  getAll():void {
    this.sectionService.findAll().subscribe((res) => {
      this.dataSection = res.body ? res.body : [];
      this.dataSectionOrigin = res.body ? res.body : [];

      this.courseService.findAll().subscribe((response) => {
        this.dataCourse = response.body ? response.body : [];

        const result = this.dataSection.map((item1) => {
          const matchingObject2 = this.dataCourse.find((item2) => item2.id === item1.course_id);
          return {
            ...item1,
            courseName: matchingObject2 ? matchingObject2.title : null
          };
        });
        this.dataSection = result;
      })
    })
  }

  getAllCourse():void {
    this.courseService.findAll().subscribe((res) => {
      this.dataCourse = res.body ? res.body : [];
    })
  }

  search():void {
    const searchValue = this.dataForm.get('searchTitle')?.value;
    if(!searchValue.trim()){
      this.dataSection = this.dataSectionOrigin
    }else{
    const dataSearch = this.dataSectionOrigin.filter((res) => res.title === searchValue)
    this.dataSection = dataSearch;
    }
  }

  confirmDelete(itemId: number) {
    this.itemIdToDelete = itemId;
    console.warn(this.itemIdToDelete);
  }

  deleteItem() {
    this.sectionService.delete(this.itemIdToDelete).subscribe(()=>{
      this.dataCourse.forEach((lesson) => {
        if (lesson.section_id === this.itemIdToDelete) {
          alert("Section này đang chứa Lesson bạn không thể xóa nó!");
          alert("Tôi Đã Update Is Delete Của nó thành True");
        } else {
            console.log(`Lesson ${lesson.id} không có section_id khớp!`);
        }
      });
      this.getAll();
    });
  }
}
