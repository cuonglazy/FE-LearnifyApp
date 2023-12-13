import { Component, OnInit } from '@angular/core';
import { Course, ICourse } from '../course.model';
import { CourseService } from 'src/app/service/course.service';
import { CategoryService } from 'src/app/service/category.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
})
export class CourseComponent implements OnInit{

  courses: Course[] = [];
  constructor(
    protected courseService: CourseService, 
    protected categoryService: CategoryService, 
    protected userService: UserService) 
    { }
 
  ngOnInit(): void {
    this.loadpage();
  }
  
  loadpage(): void {
    this.courseService.findAll().subscribe((res) => {
      this.courses = res.body ? res.body : [];
    })
  }

  onDelete(id: number): void {
    this.courseService.delete(id).subscribe(
      (response) => {
        alert("Delete Successfuly!");
      },
      (error) => {
        alert("Delete Failed!");
      }
    );
  }
}
