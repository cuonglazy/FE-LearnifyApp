import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUser, User } from 'src/app/models/user';
import { ICourse } from 'src/app/pages/course/course.model';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit{
  user: any;
  dataCourse: any;
  constructor(private activatedRoute: ActivatedRoute, protected userService: UserService){
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
    this.userService.getUserById(this.dataCourse.user_id).subscribe((res)=>{
      this.user = res;
      this.dataCourse.user_name = this.user.fullname;
    })
  }

}
