import { Component } from '@angular/core';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.scss']
})
export class PurchaseHistoryComponent {
  carts : any = [
    {
      "name":"Khóa Học làm Giàu 1",
      "price": "999 VNĐ",
      "img":"../../assets/images/thumb-1.png",
      "purchase_date": '12-10-2023'
    },
    {
      "name":"Khóa Học làm Giàu 2",
      "price": "999 VNĐ",
      "img":"../../assets/images/thumb-2.png",
      "purchase_date": '12-10-2023'
    },
    {
      "name":"Khóa Học làm Giàu 3",
      "price": "999 VNĐ",
      "img":"../../assets/images/thumb-3.png",
      "purchase_date": '12-10-2023'
    },
    {
      "name":"Khóa Học Tiêu Tiền 1",
      "price": "999 VNĐ",
      "img":"../../assets/images/thumb-4.png",
      "purchase_date": '12-10-2023'
    },
    {
      "name":"Khóa Học Tiêu Tiền 2",
      "price": "999 VNĐ",
      "img":"../../assets/images/thumb-5.png",
      "purchase_date": '12-10-2023'
    },
    {
      "name":"Khóa Học Tiêu Tiền 3",
      "price": "999 VNĐ",
      "img":"../../assets/images/thumb-6.png",
      "purchase_date": '12-10-2023'
    },
  ]
}
