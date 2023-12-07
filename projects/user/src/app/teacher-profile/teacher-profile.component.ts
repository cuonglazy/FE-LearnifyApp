import { Component } from '@angular/core';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent {
  courses : any = [
    {
      "img_course": "../../assets/images/thumb-1.png",
      "total_videos": "10 videos",
      "title":"Hướng Dẫn HTML Cơ Bản",
    },
    {
      "img_course": "../../assets/images/thumb-2.png",
      "total_videos": "10 videos",
      "title":"Hướng Dẫn CSS Cơ Bản",
    },
    {
      "img_course": "../../assets/images/thumb-3.png",
      "total_videos": "10 videos",
      "title":"Hướng Dẫn JS Cơ Bản",
    },
  ]
  teacher : any = {
    "name": "NSTruong",
    "img": "../../assets/images/pic-1.jpg",
    "specialization":"developer",
    "total_playlists": "4",
    "total_videos": "18",
    "total_likes": "1208",
    "total_cmt": "1000"
  }
}
