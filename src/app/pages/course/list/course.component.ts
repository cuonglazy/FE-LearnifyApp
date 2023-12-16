import { title } from 'process';
import { Component, OnInit } from '@angular/core';
import { Course, ICourse } from '../course.model';
import { CourseService } from 'src/app/service/course.service';
import { CategoryService } from 'src/app/service/category.service';
import { UserService } from 'src/app/service/user.service';
import { ISection } from '../../section/section.model';
import { SectionService } from 'src/app/service/section.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
})
export class CourseComponent implements OnInit{
  courses: Course[] = [];
  page = 0;
  size = 5;
  currentPage = this.page + 1;
  displayPage: number =1;
  totalPages: any;
  itemIdToDelete: number;
  searching: boolean = false;
  section: ISection [] = [];
  dataForm: FormGroup;
  dataPage: ICourse [] = [];

  constructor(
    protected courseService: CourseService, 
    protected categoryService: CategoryService, 
    protected userService: UserService,
    private formGroup: FormBuilder
    ) 
    {
      this.dataForm = this.formGroup.group({
        searchTitle: [''] 
      });
     }
 
  ngOnInit(): void {
    this.loadpage();
    this.getCourse();
  }
  
getCourse(): void {
  this.courseService.findAll().subscribe((res) => {
    this.courses = res.body ? res.body : [];
  })
}

  loadpage(): void {
    if(this.page < 0) {
      this.page = 0;
    }

    let searchKey = "";
    if(this.searching) {
      searchKey = this.dataForm.get("searchTitle")!.value;
      this.page = 0;
    } else {
      searchKey = "";
    }

    const res = {
      keyword: searchKey,
      page: this.page,
      size: this.size
    }
    this.courseService.findPage(res).subscribe((response) => {
      this.totalPages = response.body['totalPages'],
      this.dataPage = response.body['courses']
    })
  }

  search(): void {
    this.searching = true;
    this.loadpage();
  }

  confirmDelete(itemId: number) {
    this.itemIdToDelete = itemId;
    console.warn(this.itemIdToDelete);
  }

  deleteCourse() {
    this.courseService.delete(this.itemIdToDelete).subscribe(()=>{
      alert("Xóa Thành Công!")
      this.loadpage();
    });
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
    if(newPage >= 0 && newPage <= this.totalPages) {
      this.page = newPage;
      this.searching = false;
      this.loadpage();
    }
  }

}
