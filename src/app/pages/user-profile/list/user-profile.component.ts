import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { TokenService } from 'src/app/service/token.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
  users: User[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 12;
  pages: number[] = [];
  totalPages: number = 0;
  visiblePages: number[] = [];
  keyword: string = "";
  isUsersLoading: boolean = true;

  constructor(private userService: UserService,
              private tokenService: TokenService,
              private router: Router) { }

  ngOnInit(): void {
    this.getAllUsers(this.keyword, this.currentPage, this.itemsPerPage);
                                                                        }

  getAllUsers(keyword: string, page: number, limit: number) {
    this.userService.getAllUsers(keyword, page = 0, limit = 2).subscribe({
      next: (response: any) => {
        debugger
        // response.user.forEach((user: Users) => {
        //   user.url = `${environment.apiBaseUrl}/users/images/${user.image_url}`;
        // });
        this.users = response.users;
        this.totalPages = response.totalPages;
        this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
      },
      
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching users', error);
      }
    })
  }
  
  searchUsers() {
    this.currentPage = 0;
    this.itemsPerPage = 12;
    debugger
    this.getAllUsers(this.keyword, this.currentPage, this.itemsPerPage);
  }

  onPageChange(page: number) {
    debugger;
    this.currentPage = page;
    this.getAllUsers(this.keyword, this.currentPage, this.itemsPerPage);
  }

  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    return new Array(endPage - startPage + 1).fill(0).map((_, index) => startPage + index);
  }

  // onUserClick(userId: number) {
  //   debugger;
  //   // Điều hướng đến trang detail-user với userId là tham số
  //   this.router.navigate(['/users', userId]);
  // }
  
}
