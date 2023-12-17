import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  key = "cart_item"
  cartItems : any;
  ngOnInit(): void {
    this.getFromLocalStorage(this.key);
  }

  getFromLocalStorage(key: string): void {
    try {
      // Đọc giá trị từ localStorage và chuyển đổi thành đối tượng JavaScript
      const serializedValue = localStorage.getItem(key);
      const convertObject = serializedValue ? JSON.parse(serializedValue) : null;

      // Nếu có user id thì cmt dòng dưới
      this.cartItems = convertObject;

      // nếu có id user thì lọc và hiển thị các các cart có user id
      // const filteredItems = convertObject.filter((item: any) => item.user_id !== id);
      // this.cartItems = filteredItems;
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
