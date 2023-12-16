import { Component, OnInit } from '@angular/core';
import { ICourse } from 'src/app/pages/course/course.model';
import { CourseService } from 'src/app/service/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  page:number=1;
  size = 9;
  dataCoursePage : ICourse[] = [];
  totalAllLength: any;
  constructor(private courseService: CourseService){

  }

  ngOnInit(): void {
    this.getCourseInfo();
      
  }

  getCourseInfo():void{
    this.courseService.findAllCourseInfo().subscribe((res)=>{
      this.dataCoursePage = res.body ? res.body : [];
      console.warn(this.dataCoursePage);
      
    })
  }

  onSizeChange(selectedSize: number): void {
    this.size = selectedSize;
    this.getCourseInfo();
  }


  courses : any = [
    {
      "img_teacher": "../../assets/images/pic-1.jpg",
      "name_teacher": "NSTruong",
      "date_upload":"21-10-2022",
      "img_course": "../../assets/images/thumb-1.png",
      "total_videos": "10 videos",
      "title":"Hướng Dẫn HTML Cơ Bản",

    },
    {
      "img_teacher": "../../assets/images/pic-2.jpg",
      "name_teacher": "DVVo",
      "date_upload":"21-10-2022",
      "img_course": "../../assets/images/thumb-2.png",
      "total_videos": "10 videos",
      "title":"Hướng Dẫn Css Cơ Bản",
    },
    {
      "img_teacher": "../../assets/images/pic-3.jpg",
      "name_teacher": "HQCuong",
      "date_upload":"21-10-2022",
      "img_course": "../../assets/images/thumb-3.png",
      "total_videos": "10 videos",
      "title":"Hướng Dẫn Js Cơ Bản",
    },
    {
      "img_teacher": "../../assets/images/pic-4.jpg",
      "name_teacher": "DVCuong",
      "date_upload":"21-10-2022",
      "img_course": "../../assets/images/thumb-4.png",
      "total_videos": "10 videos",
      "title":"Hướng Dẫn Bootstrap Cơ Bản",
    },
    {
      "img_teacher": "../../assets/images/pic-5.jpg",
      "name_teacher": "NVNhat",
      "date_upload":"21-10-2022",
      "img_course": "../../assets/images/thumb-5.png",
      "total_videos": "10 videos",
      "title":"Hướng Dẫn JQuery Cơ Bản",
    },
    {
      "img_teacher": "../../assets/images/pic-6.jpg",
      "name_teacher": "NVLuan",
      "date_upload":"21-10-2022",
      "img_course": "../../assets/images/thumb-6.png",
      "total_videos": "10 videos",
      "title":"Hướng Dẫn SASS Cơ Bản",
    },
  ]
}
