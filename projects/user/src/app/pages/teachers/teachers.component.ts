import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit{
  dataTeacherInfo : User[]=[];

  constructor(protected userService: UserService){}

  ngOnInit(): void {
  this.getTeacherInfo();    
  }

  getTeacherInfo():void{
    this.userService.GetAllTeacherInfo().subscribe((res)=>{
      this.dataTeacherInfo = res ? res : [];
      console.warn(this.dataTeacherInfo);      
    })
  }
}
