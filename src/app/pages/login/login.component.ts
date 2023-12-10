import { Component, Directive, Input, NgModule, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginDTO } from 'src/app/dtos/user/login.dto';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/responses/users/login.response';
import { TokenService } from 'src/app/service/token.service';
import { RoleService } from 'src/app/service/role.service';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('loginForm') loginForm!: NgForm;

  /*
  //Login user
  email: string = 'user@gmail.com';
  password: string = '123456';

  //Login admin
  phoneNumber: string = 'admin@gmail.com';
  password: string = '123456';

  */

  email: string = 'admin@gmail.com';
  password: string = '123456';
  roles: Role[] = [];
  rememberMe: boolean = true;
  selectedRole: Role | undefined; // Biến để lưu giá trị được chọn từ dropdown
  roleList: any;
  // userResponse?: UserResponse

  constructor(
    private userService: UserService,
    private router: Router,
    private tokenService: TokenService,
    private roleService: RoleService
    ) {}

    ngOnInit() {
      // Gọi API lấy danh sách roles và lưu vào biến roles
      debugger
      this.roleService.getRoles().subscribe({
        next: (roles: Role[]) => { // Sử dụng kiểu Role[]
          debugger
          this.roles = roles;
          this.selectedRole = roles.length > 0 ? roles[0] : undefined;
        },
        error: (error: any) => {
          debugger
          console.error('Error getting roles:', error);
        }
      });
    }


  onEmailChange() {
    console.log(`Email type: ${this.email}`)
  }

    // Handle the change event
    onRoleChange(event: any) {
      // Get the index of the selected option
      const selectedIndex = event.target.selectedIndex;
  
      // Update selectedRole based on the index
      this.selectedRole = this.roles[selectedIndex];
  
      // You can also log the selectedRole to verify
      console.log('Selected Role:', this.selectedRole);
    }

  login() {
    // const message = `email: ${this.email}` +
    //   `password: ${this.password}` +
    //   `role_id: ${this.selectedRole?.id}`
    //alert(message);
    debugger

    const loginDTO: LoginDTO = {
      email: this.email,
      password: this.password,
      role_id: this.selectedRole?.id ?? 1
    };
    this.userService.login(loginDTO).subscribe({
      next: (response: LoginResponse) => {
        debugger;
        const { token } = response;
        if (this.rememberMe) {
          this.tokenService.setToken(token);
        }                
      },
      complete: () => {
        debugger;
        this.router.navigate(['/system-admin/dashboard']);
      },
      error: (error: any) => {
        debugger;
        alert(error.error.message);
      }
    });
  }

  ngOnDestroy(): void {
      
  }

}
