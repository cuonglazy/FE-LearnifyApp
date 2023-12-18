import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/service/comment.service';

@Component({
  selector: 'app-watch-video',
  templateUrl: './watch-video.component.html',
  styleUrls: ['./watch-video.component.css']
})
export class WatchVideoComponent implements OnInit{
  commentUser: string = '';
  commmentData: any;
  commentId: number;

  constructor(private commentService: CommentService,
    private activited: ActivatedRoute) {

  }

  ngOnInit(): void {
      this.activited.data.subscribe((course) => {
        this.commmentData = course.course
      })
  }
  saveComment(comment: string) {
    const serializedValue = localStorage.getItem("user")
    const convertObj = JSON.parse(serializedValue)

    this.commentUser = comment;

    const comments = {
      id: null,
      user_id: convertObj.id,
      course_id: this.commmentData.id
    }

    if(convertObj.id) {
      this.commentService.getAllCommentByCourseId(this.commmentData.id).subscribe(res => {
        this.commentUser = res.body ? res.body : [];
        for(const dataComment of this.commentUser) {
          
        }
      })
    }
  }

  getAllCommentBuCourseId(id: number): void {
    this.commentService.getAllCommentByCourseId(id).subscribe(res => {
      this.commmentData = res.body ? res.body : [];
    })
  }

  deleteComment(id: number): void {
    this.commentService.delete(id).subscribe((res) => {
      console.log("xoa thanh cong", res);
    })
  }
}
