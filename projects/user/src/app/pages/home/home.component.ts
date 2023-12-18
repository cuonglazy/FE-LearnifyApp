import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { rmSync } from 'fs';
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
  page:number=1;
  size = 9;
  dataForm: FormGroup;
  dataPage : any[] = [];
  totalAllLength: any;
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
      this.getCourseInfo();
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

// 
  getCourseInfo():void{
    this.courseService.findAllCourseInfo().subscribe((res)=>{
      this.dataPage = res.body ? res.body : [];

      const uniqueCourses = this.dataPage.filter((course, index, self) => 
        index === self.findIndex((c) => (
          c.courseId === course.courseId
        ))
      );
      this.dataPage = uniqueCourses;
      console.warn(this.dataPage);
    })
  }

  onSizeChange(selectedSize: number): void {
    this.size = selectedSize;
    this.getCourseInfo();
  }

}
