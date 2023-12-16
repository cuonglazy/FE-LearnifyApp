import { Component, OnInit } from '@angular/core';
import { SectionService } from '../../../service/section.service';
import { ISection } from '../section.model';
import { CourseService } from 'src/app/service/course.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LessonService } from 'src/app/service/lesson.service';
import { ILesson } from '../../lesson/lesson.model';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
})
export class SectionComponent implements OnInit {
  page = 0;
  size = 10;
  currentPage = this.page + 1;
  displayPage: number = 1;
  totalPages: any;
  searching: boolean = false;
  dataPage : ISection[] = [];
  itemIdToDelete: number;
  dataLesson: ILesson[] = [];
  dataCourse: any[] = [];
  dataForm: FormGroup;
  constructor(protected sectionService: SectionService,protected courseService: CourseService, protected lessonService: LessonService ,protected fb: FormBuilder) {
    this.dataForm = this.fb.group({
      searchTitle: [''] 
    });
   }

  ngOnInit(): void {
    // this.getAll();
    this.getAllCourse();
    this.getAllLesson();
    this.loadPage();
  }

  getAllLesson():void {
    this.lessonService.findAll().subscribe((res) =>{
      this.dataLesson = res.body ? res.body : [];
    })
  }

  getAllCourse():void {
    this.courseService.findAll().subscribe((res) => {
      this.dataCourse = res.body ? res.body : [];
    })
  }

  confirmDelete(itemId: number) {
    this.itemIdToDelete = itemId;
  }

  deleteItem() {
    this.sectionService.delete(this.itemIdToDelete).subscribe(()=>{
      this.dataLesson.forEach((lesson) => {
        if (lesson.section_id === this.itemIdToDelete) {
          alert("Section này đang chứa Lesson bạn không thể xóa nó!");
          alert("Tôi Đã Update Is Delete Của nó thành False");
        } else {
          alert("Xóa Thành Công!")
        }
        this.loadPage();
      });   
    });
    
  }


  search():void {
    this.searching = true;
    this.loadPage();
  }

  loadPage(): void {
    if (this.page < 0) {
      this.page = 0;
    }
    
    let searchKey = ""

    if(this.searching){
      searchKey = this.dataForm.get("searchTitle")!.value;
      this.page = 0;
    }else{
      searchKey = ""
    }

    const res = {
      keyword: searchKey,
      page: this.page,
      size: this.size
    }

    this.sectionService.findPage(res).subscribe((response)=>{
      this.totalPages = response.body['totalPages'],
      this.dataPage = response.body['section']

      this.courseService.findAll().subscribe((response) => {
        this.dataCourse = response.body ? response.body : [];

        const result = this.dataPage.map((item1) => {
          const matchingObject2 = this.dataCourse.find((item2) => item2.id === item1.course_id);
          return {
            ...item1,
            courseName: matchingObject2 ? matchingObject2.title : null
          };
        });
        this.dataPage = result;
      })

    })
  }

  getPageArray(): number[] {
    const pages = [];
    const numberOfPagesToShow = 3;
    this.displayPage = Math.floor(this.page / numberOfPagesToShow) * numberOfPagesToShow + 1;
    
    if (this.page >= this.totalPages - numberOfPagesToShow || this.page === 0) {
      this.displayPage = 1;
    }

    for (let i = 0; i < numberOfPagesToShow; i++) {
      const page = this.displayPage + i;
      if (page <= this.totalPages) {
        pages.push(page);
      }
    }
    return pages;
  }

  navigateToPage(newPage: number): void {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.page = newPage;
      this.searching = true;
      this.loadPage();
    }
  }

  onSizeChange(selectedSize: number): void {
    this.size = selectedSize;    
    this.page = 0;
    this.loadPage();
  }
}
