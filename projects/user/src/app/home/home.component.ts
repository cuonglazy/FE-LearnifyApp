import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
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
