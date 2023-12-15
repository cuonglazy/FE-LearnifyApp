import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ICategory } from 'src/app/pages/category/category.model';
import { ICourse } from 'src/app/pages/course/course.model';
import { CategoryService } from 'src/app/service/category.service';
import { CourseService } from 'src/app/service/course.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //Course & Page
  page = 0;
  size = 10;
  currentPage = this.page + 1;
  displayPage: number = 1;
  totalPages: any;
  searching: boolean = false;
  dataPage : ICourse[] = [];
  dataForm: FormGroup;
  //NavBar Category
  category: ICategory[] = [];
  treeCategories: any[] = [];
  constructor(private categoryService: CategoryService,private courseService: CourseService ,protected fb: FormBuilder){
    this.dataForm = this.fb.group({
      searchCode: [''] 
    });
  }

  ngOnInit(): void {
      this.getAllCategory();
      this.loadPage();
  }

  getAllCategory(){
    this.categoryService.findAll().subscribe((res) => {
      this.category = res.body ? res.body : [];
      this.treeCategories = this.buildTree(res.body,null);
    })
  }

  buildTree(categories: any[],parentId: number | null): any[]{
    const tree: any[] = [];
    categories.filter(category => category.parent_id === parentId).forEach(category => {
      const children = this.buildTree(categories,category.id);
      
      if(children.length){
        category.children = children;
      }

      tree.push(category);
    })
    return tree;
  }

// Page
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
    this.courseService.findPage(res).subscribe((response)=>{
      this.totalPages = response.body['totalPages'],
      this.dataPage = response.body['courses']
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


























  courses : any = [
    {
      "img_teacher": "../../assets/images/pic-1.jpg",
      "name_teacher": "NSTruong",
      "date_upload":"21-10-2022",
      "img_course": "../../assets/images/thumb-1.png",
      "total_videos": "10 videos",
      "title":"Hướng Dẫn HTML Cơ Bản",

    },
    {
      "img_teacher": "../../assets/images/pic-2.jpg",
      "name_teacher": "DVVo",
      "date_upload":"21-10-2022",
      "img_course": "../../assets/images/thumb-2.png",
      "total_videos": "10 videos",
      "title":"Hướng Dẫn Css Cơ Bản",
    },
    {
      "img_teacher": "../../assets/images/pic-3.jpg",
      "name_teacher": "HQCuong",
      "date_upload":"21-10-2022",
      "img_course": "../../assets/images/thumb-3.png",
      "total_videos": "10 videos",
      "title":"Hướng Dẫn Js Cơ Bản",
    },
    {
      "img_teacher": "../../assets/images/pic-4.jpg",
      "name_teacher": "DVCuong",
      "date_upload":"21-10-2022",
      "img_course": "../../assets/images/thumb-4.png",
      "total_videos": "10 videos",
      "title":"Hướng Dẫn Bootstrap Cơ Bản",
    },
    {
      "img_teacher": "../../assets/images/pic-5.jpg",
      "name_teacher": "NVNhat",
      "date_upload":"21-10-2022",
      "img_course": "../../assets/images/thumb-5.png",
      "total_videos": "10 videos",
      "title":"Hướng Dẫn JQuery Cơ Bản",
    },
    {
      "img_teacher": "../../assets/images/pic-6.jpg",
      "name_teacher": "NVLuan",
      "date_upload":"21-10-2022",
      "img_course": "../../assets/images/thumb-6.png",
      "total_videos": "10 videos",
      "title":"Hướng Dẫn SASS Cơ Bản",
    },
  ]
}
