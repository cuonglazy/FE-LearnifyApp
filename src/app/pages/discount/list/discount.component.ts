import { Component, OnInit } from '@angular/core';
import { DiscountService } from '../../service/discount.service';
import { IDiscount } from '../discount.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
})
export class DiscountComponent implements OnInit {
  page = 0;
  size = 3;
  currentPage = this.page + 1;
  dataDiscounts: IDiscount[] = [];
  dataOrigin: IDiscount[] = [];
  dataForm: FormGroup;
  constructor(private dataService: DiscountService,protected fb: FormBuilder) {
    this.dataForm = this.fb.group({
      searchCode: [''] 
    });
  }
  ngOnInit() {
    this.getData();
    this.getPages(this.page,this.size);
  }

  getData(): void {
    this.dataService.findAll().subscribe((res) => {
      // this.dataDiscounts = res.body ? res.body : [];
      this.dataOrigin = res.body ? res.body : [];
    });
  }

  getPages(page:any,size:any):void {
    this.dataService.findPages(page,size).subscribe((res) => {
      this.dataDiscounts = res.body ? res.body : [];
      // this.dataOrigin = res.body ? res.body : [];
    })
  }

  search():void {
    const searchValue = this.dataForm.get('searchCode')?.value;
    if(!searchValue.trim()){
      this.dataDiscounts = this.dataOrigin
    }else{
    const dataSearch = this.dataOrigin.filter((res) => res.code === searchValue)
    this.dataDiscounts = dataSearch;
    }
  }

  previousPage() {
    if(this.page > 0){
      this.page--;
      this.currentPage = this.page + 1;
      this.getPages(this.page,this.size);
    }
  }

  nextPage() {
    const totalPages = Math.ceil(this.dataOrigin.length / this.size);

    if (this.page < totalPages) {
      this.page++;
      this.currentPage = this.page + 1;
      this.getPages(this.page,this.size);
    }
  }
  
}
