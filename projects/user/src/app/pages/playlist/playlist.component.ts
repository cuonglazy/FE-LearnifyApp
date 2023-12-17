import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUser, User } from 'src/app/models/user';
import { ICourse } from 'src/app/pages/course/course.model';
import { DiscountService } from 'src/app/service/discount.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit{
  user: any;
  dataCourse: any;
  dataDiscount:any;
  discountsWithCourseId: any[] = [];
  constructor(private activatedRoute: ActivatedRoute, private discountService: DiscountService, private userService: UserService){
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((course)=>{      
      this.support(course);
    })
  }

  support(course: any):void{
    this.dataCourse = course.course;
    this.dataCourse.start_time = this.dataCourse.start_time.replace('T', ' ');
    this.dataCourse.end_time = this.dataCourse.end_time.replace('T', ' ');
    console.warn(this.dataCourse);
    this.discountService.findAll().subscribe(res =>{
      this.dataDiscount = res.body ? res.body : [];
      this.dataDiscount.forEach(discount => {
        discount.discountCourses.forEach(discountCourse => {
            if (discountCourse.course_id === this.dataCourse.user_id) {
                this.discountsWithCourseId.push(discount);
            }
        });
      });
      console.warn("discount",this.discountsWithCourseId);
    })
    this.userService.getUserById(this.dataCourse.user_id).subscribe((res)=>{
      this.user = res;
      this.dataCourse.user_name = this.user.fullname;
    })
  }

}
