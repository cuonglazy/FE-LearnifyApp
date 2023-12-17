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
  dataCourse: any;
  dataLesson: any;
  dataSection: any;
  dataDiscount:any;
  discountsWithCourseId: any[] = [];
  discountPercentage = 0;
  key = "cart_item";
  user = "user";
  ItemCart : any;
  constructor(private activatedRoute: ActivatedRoute, private discountService: DiscountService, private userService: UserService){
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((course)=>{      
      this.support(course);
    })
  }

  support(course: any):void{
    this.dataCourse = course.course;
    this.replaceTWithSpace();
    this.fullNameUser();
    this.priceDiscount();
    this.disableAddCart();
    console.warn(this.dataCourse);
    
  }

  // thay thế T bằng dấu cách
  replaceTWithSpace():void{
    this.dataCourse.start_time = this.dataCourse.start_time.replace('T', ' ');
    this.dataCourse.end_time = this.dataCourse.end_time.replace('T', ' ');
  }

  // Thêm Fullname của user vào dataCourse
  fullNameUser():void{
    this.userService.getUserById(this.dataCourse.user_id).subscribe((res)=>{
      const userName = res.fullname;
      this.dataCourse.fullname = userName;
    })

    const serializedValue = localStorage.getItem(this.user);
    const convertObject = JSON.parse(serializedValue);
    this.dataCourse.userLoginId = convertObject.id;
  }

  // giá Khóa Học sao khi giảm giá 
  priceDiscount():void{
    this.discountService.findAll().subscribe(res => {
      this.dataDiscount = res.body ? res.body : [];
      for (const discount of this.dataDiscount) {
        for (const course of discount.discountCourses) {
          if (course.course_id === this.dataCourse.id) {
            if(discount.isActive){
              if(course.is_delete){
                if(discount.percentage > this.discountPercentage){
                  this.discountPercentage = discount.percentage;
                }
                break;
              }
            }
          }
        }
      }    
      const priceDiscount = (this.dataCourse.price - ( this.dataCourse.price * this.discountPercentage / 100)).toFixed(2);
      this.dataCourse.priceDiscount = priceDiscount;
    });
  }

  // Hàm lưu giá trị vào localStorage
  saveToLocalStorage(value: any): void {
    try {
      // Chuyển đối giá trị thành chuỗi trước khi lưu vào localStorage
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(this.key, serializedValue);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  // Hàm đọc giá trị từ localStorage
  getFromLocalStorage(key: string): any | null {
    try {
      // Đọc giá trị từ localStorage và chuyển đổi thành đối tượng JavaScript
      const serializedValue = localStorage.getItem(key);
      const test = serializedValue ? JSON.parse(serializedValue) : null;
      console.warn(test);      
      return test;
    } catch (error) {
      console.error('Error getting from localStorage:', error);
      return null;
    }
  }


  addToLocalStorage(): void {
    try {
      // Đọc giá trị từ localStorage
      const currentItems = this.getFromLocalStorage(this.key) || [];

      // Thêm phần tử mới vào mảng hiện tại
      currentItems.push(this.dataCourse);

      // Lưu mảng mới vào localStorage
      this.saveToLocalStorage(currentItems);

      this.disableAddCart();
    } catch (error) {
      console.error('Error adding to localStorage:', error);
    }
  }

  disableAddCart():void{
    const serializedValue = localStorage.getItem(this.key);

    if(serializedValue === null || serializedValue === undefined){
      this.ItemCart = 0
    }else{
      const convertObject = JSON.parse(serializedValue);
      const filteredItems = convertObject.filter((item: any) => item.id === this.dataCourse.id);
      if(filteredItems.length > 0){
        this.ItemCart = 1
      }else{
        this.ItemCart = 0
      }
    }
  }
}
