import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { RegisterDTO } from 'src/app/dtos/user/register.dto';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {

  @ViewChild('registerForm') registerForm!: NgForm;
  
  fullname: string;
  phone_number: string;
  email: string;
  password: string;
  retypePassword: string;
  isAccepted: boolean;
  date_of_birth: Date;
  address: string;
  role_id: number;
  
  constructor(private router: Router, private userService: UserService) {
    this.fullname;
    this.email;
    this.password;
    this.retypePassword;
    this.isAccepted = true;
    this.date_of_birth = new Date();
    this.date_of_birth.setFullYear(this.date_of_birth.getFullYear() - 18);
    this.address;
    this.phone_number;
    this.role_id = 2;
    //inject

  }

  onEmailChange() {
    console.log(`Email type: ${this.email}`)
  }

  register() {
    const registerDTO: RegisterDTO = {
      fullname: this.fullname,
      phone_number: this.phone_number,
      email: this.email,
      address: this.address,
      password: this.password,
      retype_password: this.retypePassword,
      date_of_birth: this.date_of_birth,
      facebook_account_id: 0,
      google_account_id: 0,
      role_id: 2
    }
    this.userService.register(registerDTO).subscribe({
      next: (response: any) => {
        this.router.navigate(['/login']);
        alert("Đăng ký thành công")
      },
      complete: () => {
      },
      error: (error: any) => {
        alert(`Cannot register, error: ${error.error}`)
      }
    })
  }

  checkPasswordMatch() {
    if(this.password !== this.retypePassword) {
      this.registerForm.form.controls['retypePassword'].setErrors({'passwordMismatch': true});
    } else {
      this.registerForm.form.controls['retypePassword'].setErrors(null);
    }
  }

  checkAge() {
    if(this.date_of_birth) {
      const today = new Date();
      const birthDay = new Date(this.date_of_birth);
      let age = today.getFullYear() - birthDay.getFullYear();
      const monthDiff = today.getMonth() - birthDay.getMonth();
      if(monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDay.getDate())) {
        age--;
      }

      if(age < 18) {
        this.registerForm.form.controls['date_of_birth'].setErrors({'invalidAge': true});
      } else {
        this.registerForm.form.controls['date_of_birth'].setErrors(null);
      }
    }
  }

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    // console.log(this.form.value);
    this.router.navigate(['/dashboard']);
  }
}
