import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  key = "cart_item";
  user = "user";
  cartItems : any;
  ngOnInit(): void {
    this.getFromLocalStorage(this.key);
  }

  getFromLocalStorage(key: string): void {
    try {
      const serializedValue = localStorage.getItem(key);
      const convertObject = serializedValue ? JSON.parse(serializedValue) : null;
      
      const dataUserDetailString = localStorage.getItem(this.user);
      const dataUserDetail = JSON.parse(dataUserDetailString);
      const filteredItems = convertObject.filter((item: any) => item.userLoginId == dataUserDetail.id);
      this.cartItems = filteredItems;
      console.warn(this.cartItems);
      
    } catch (error) {
      console.error('Error getting from localStorage:', error);
    }
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

}
