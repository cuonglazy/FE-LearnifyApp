import { Component, OnInit } from '@angular/core';
import { Course } from '../course.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
})
export class CourseComponent implements OnInit {

  courses: Course[] = [];

  constructor(protected course: Course) { }

  ngOnInit(): void {
  }

  findAll(){
    
  }

}
