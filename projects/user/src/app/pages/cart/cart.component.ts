import { PaymentServiceService } from './../../../../../../src/app/service/payment-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { warn } from 'console';
import { CartItemsService } from 'src/app/service/cart-items.service';
import { isBuffer } from 'util';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  paymentHtml: string;
  key = "cart_item";
  user = "user";
  cartItems : any;
  payment: any;
  constructor(private router: Router, private cartService: CartItemsService, private paymentService :PaymentServiceService) {}
  ngOnInit(): void {
    this.getFromLocalStorage(this.key);
  
    const userId = JSON.parse(localStorage.getItem("user"));
  
    if (this.cartItems != null && this.cartItems.length > 0) {
      this.cartService.getAllItems(userId.id).subscribe(
        response => {
          console.log('Success:', response);
  
          // Lọc những phần tử mới không trùng với this.cartItems
          const newItems = response.filter(newItem => 
            !this.cartItems.some(existingItem => existingItem.id === newItem.id)
          );
  
          // Thêm những phần tử mới vào this.cartItems
          this.cartItems = [...this.cartItems, ...newItems];
          
          // Lưu vào localStorage
          this.saveToLocalStorage(this.key, this.cartItems);
        },
        error => {
          console.error('Error:', error);
        }
      );
    } else {
      this.cartService.getAllItems(userId.id).subscribe(
        response => {
          console.log('Success:', response);
          this.cartItems = response;
          this.saveToLocalStorage(this.key, this.cartItems);
        },
        error => {
          console.error('Error:', error);
        }
      );
    }
  }
  
  
  saveToLocalStorage(key: string, value: any): void {
    try {
      // Lưu giá trị vào localStorage
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  getFromLocalStorage(key: string): void {
    try {
      const serializedValue = localStorage.getItem(key);
      const convertObject = serializedValue ? JSON.parse(serializedValue) : null;
      
      const dataUserDetailString = localStorage.getItem(this.user);
      const dataUserDetail = JSON.parse(dataUserDetailString);
      const filteredItems = convertObject.filter((item: any) => item.userLoginId == dataUserDetail.id);
      console.warn(filteredItems);
      
      this.cartItems = filteredItems;
      console.warn(this.cartItems);
      
    } catch (error) {
      console.error('Error getting from localStorage:', error);
    }
  }
  ngAfterViewInit() {
   this.reloadData()
  }

  reloadData() {
    const data = localStorage.getItem(this.key)
    const userId = JSON.parse(localStorage.getItem("user"));
    if(data == null) {
      this.cartService.getAllItems(userId.id).subscribe(
        response => {
          console.log('Success:', response);
          this.cartItems = response;
          this.saveToLocalStorage(this.key, this.cartItems);
        },
        error => {
          console.error('Error:', error);
        }
      );
    }
  }
  saveCart(){
    console.warn(this.key);
    const data = JSON.parse(localStorage.getItem(this.key))
    if(data == null) {
      return;
    }
    
    const newArray = data.map((item) => {
      return {
        id: item.id || item.course_id || item.other_id,
        price: item.price || item.course_price || item.other_price,
        user_id: item.userLoginId || item.course_user_id || item.other_user_id
      };
    });
    const arrId = [];
    let totalPrice = null;
    for (const item of newArray) {
      arrId.push(item.id);
      totalPrice +=item.price;
    }
   
    
    const cart_item = {
      cartData:  arrId.join(','),
      total_price: totalPrice,
      status: "pending",
      userId: newArray[0]?.user_id // Assuming all items in newArray have the same user_id
    };
     
    
    this.cartService.create(cart_item).subscribe(
      response => {
        console.log('Success:', response);
        this.payment = {
          total_price: response.total_price,
          cart_item_id: response.cart_item_id,
          userId: response.user_id
        }
      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  deleteCart(){
    localStorage.removeItem(this.key);
    this.reloadData();
  }
  // Hàm xoá giá trị từ localStorage
  removeFromLocalStorage(id: number): void {
    try {
      // Đọc giá trị từ localStorage
      const currentItems = localStorage.getItem(this.key);
      const dataArray = JSON.parse(currentItems);

      // Lọc ra mảng mới không chứa phần tử có id trùng với itemId
      const filteredItems = dataArray.filter((item: any) => item.id !== id);
      
      // Lưu mảng mới vào localStorage
      localStorage.setItem(this.key, JSON.stringify(filteredItems));
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }
  removeItem(id: any):void{

  }
  //payment
  redirectToVNPayQR(){
    console.warn(this.payment);
    
    this.paymentService.create(this.payment).subscribe(html =>{
      this.paymentHtml = html;
    },
    error => console.error('Lỗi khi lấy HTML từ máy chủ:', error)
    )
  }
}
