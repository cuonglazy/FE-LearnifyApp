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
  constructor(protected courseService: CourseService, protected categoryService: CategoryService, protected userService: UserService) { }
 
  ngOnInit(): void {
    this.getData();
  }
  
  getData(): void {
    this.courseService.findAll().subscribe((res) => {
      this.courses = res.body ? res.body : [];
    })
  }

  // async findAll() {
  //   const courses = await this.courseService.findAll().toPromise();
  //   this.courses = courses.body ? courses.body : [];
  
  //   const observables = this.courses.map(async (course) => {
  //     if (course.category_id) {
  //       const categoryRes = await this.categoryService.find(course.category_id).toPromise();
  //       course.category_name = categoryRes.body ? categoryRes.body.name : '';
  //     }
  
  //     // if (course.user_id) {
  //     //   const userRes = await this.userService.getByID(course.user_id).toPromise();
  //     //   course.user_name = userRes.body ? userRes.body.fullName : '';
  //     // }
  //   });
  
  //   await Promise.all(observables);
  // }
  
  // findAll() {
  //   this.courseService.findAll().subscribe((res) => {
  //     this.courses = res.body ? res.body : [];

  //     const observables = this.courses.map(course => {
  //       const categoryObservable = course.category_id ? this.categoryService.find(course.category_id) : of(null);
  //       const userObservable = course.user_id ? this.userService.find(course.user_id) : of(null);

  //       return forkJoin([categoryObservable, userObservable]).pipe(
  //         // Mapping the response to an object for easier access
  //         map(([categoryRes, userRes]) => ({ categoryRes, userRes }))
  //       );
  //     });

  //     forkJoin(observables).subscribe((responses: { categoryRes: any, userRes: any }[]) => {
  //       responses.forEach((response, index) => {
  //         const { categoryRes, userRes } = response;

  //         if (categoryRes) {
  //           this.courses[index].category_name = categoryRes.body ? categoryRes.body.name : '';
  //         }

  //         if (userRes) {
  //           this.courses[index].user_name = userRes.body ? userRes.body.name : '';
  //         }
  //       });
  //     });
  //   });
  // }
}
