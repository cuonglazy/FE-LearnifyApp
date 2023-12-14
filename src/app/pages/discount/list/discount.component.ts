import { Component, OnInit } from '@angular/core';
import { DiscountService } from 'src/app/service/discount.service';
import { IDiscount } from '../discount.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
})
export class DiscountComponent implements OnInit {
  page = 0;
  size = 10;
  currentPage = this.page + 1;
  displayPage: number = 1;
  totalPages: any;
  searching: boolean = false;
  dataPage : IDiscount[] = [];
  dataDiscounts: IDiscount[] = [];
  dataForm: FormGroup;
  constructor(private dataService: DiscountService,protected fb: FormBuilder) {
    this.dataForm = this.fb.group({
      searchCode: [''] 
    });
  }
  ngOnInit() {
    this.getData();
    this.loadPage();
  }

  onDelete(id: number): void {
    const text = "Bạn Có Chắc Muốn Xóa Discount Này!"
    if (confirm(text) == true) {
      this.dataService.delete(id).subscribe(
        (response) => {
          alert("Xóa Thành Công")
          this.loadPage();
        },
        (error) => {
          alert("Xóa Lỗi")
        }
      );
    }
  }

  getData(): void {
    this.dataService.findAll().subscribe((res) => {
      this.dataDiscounts = res.body ? res.body : [];
    });
  }

  search():void {
    this.searching = true;
    this.loadPage();
  }

  loadPage(): void {
    if (this.page < 0) {
      this.page = 0;
    }
    
    let searchKey = ""

    if(this.searching){
      searchKey = this.dataForm.get("searchCode")!.value;
      this.page = 0;
    }else{
      searchKey = ""
    }

    const res = {
      keyword: searchKey,
      page: this.page,
      size: this.size
    }
    this.dataService.findPage(res).subscribe((response)=>{
      this.totalPages = response.body['totalPages'],
      this.dataPage = response.body['discount']
    })
  }

  getPageArray(): number[] {
    const pages = [];
    const numberOfPagesToShow = 3;
    this.displayPage = Math.floor(this.page / numberOfPagesToShow) * numberOfPagesToShow + 1;
    
    if (this.page >= this.totalPages - numberOfPagesToShow || this.page === 0) {
      this.displayPage = 1;
    }

    for (let i = 0; i < numberOfPagesToShow; i++) {
      const page = this.displayPage + i;
      if (page <= this.totalPages) {
        pages.push(page);
      }
    }
    return pages;
  }

  navigateToPage(newPage: number): void {
    if (newPage >= 0 && newPage < this.totalPages) {
      this.page = newPage;
      this.loadPage();
    }
  }

  onSizeChange(selectedSize: number): void {
    this.size = selectedSize;
    this.loadPage();
  }
}
