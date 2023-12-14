import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  carts : any = [
    {
      "name":"Khóa Học làm Giàu 1",
      "price": "999 VNĐ",
      "img":"../../assets/images/thumb-1.png"
    },
    {
      "name":"Khóa Học làm Giàu 2",
      "price": "999 VNĐ",
      "img":"../../assets/images/thumb-2.png"
    },
    {
      "name":"Khóa Học làm Giàu 3",
      "price": "999 VNĐ",
      "img":"../../assets/images/thumb-3.png"
    },
    {
      "name":"Khóa Học Tiêu Tiền 1",
      "price": "999 VNĐ",
      "img":"../../assets/images/thumb-4.png"
    },
    {
      "name":"Khóa Học Tiêu Tiền 2",
      "price": "999 VNĐ",
      "img":"../../assets/images/thumb-5.png"
    },
    {
      "name":"Khóa Học Tiêu Tiền 3",
      "price": "999 VNĐ",
      "img":"../../assets/images/thumb-6.png"
    },
  ]
}
