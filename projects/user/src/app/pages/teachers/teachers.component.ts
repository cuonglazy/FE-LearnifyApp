import { Component } from '@angular/core';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent {
  teachers : any = [
    {
      "name": "NSTruong",
      "img": "../../assets/images/pic-1.jpg",
      "specialization":"developer",
      "total_playlists": "4",
      "total_videos": "18",
      "total_likes": "1208"
    },
    {
      "name": "DVVo",
      "img": "../../assets/images/pic-2.jpg",
      "specialization":"developer",
      "total_playlists": "4",
      "total_videos": "18",
      "total_likes": "1208"
    },
    {
      "name": "HQCuong",
      "img": "../../assets/images/pic-3.jpg",
      "specialization":"developer",
      "total_playlists": "4",
      "total_videos": "18",
      "total_likes": "1208"
    },
    {
      "name": "DVCuong",
      "img": "../../assets/images/pic-4.jpg",
      "specialization":"developer",
      "total_playlists": "4",
      "total_videos": "18",
      "total_likes": "1208"
    },
    {
      "name": "NVNhat",
      "img": "../../assets/images/pic-5.jpg",
      "specialization":"developer",
      "total_playlists": "4",
      "total_videos": "18",
      "total_likes": "1208"
    },
    {
      "name": "NVLuan",
      "img": "../../assets/images/pic-6.jpg",
      "specialization":"developer",
      "total_playlists": "4",
      "total_videos": "18",
      "total_likes": "1208"
    },
  ]
}
