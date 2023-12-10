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
  
  fullName: string;
  phone_number: string;
  email: string;
  password: string;
  retypePassword: string;
  isAccepted: boolean;
  dob: Date;
  address: string;
  
  constructor(private router: Router, private userService: UserService) {
    this.fullName = 'Van Vo';
    this.email = 'vanvo2804031@gmail.com';
    this.password = '123456';
    this.retypePassword = '123456';
    this.isAccepted = true;
    this.dob = new Date();
    this.dob.setFullYear(this.dob.getFullYear() - 18);
    this.address = '';
    this.phone_number = '';
    //inject

  }

  onEmailChange() {
    console.log(`Email type: ${this.email}`)
  }

  register() {
    // const message = 'fullname: ' + this.fullName + ' - email: ' + this.email +
    //                 ' - password:' + this.password + ' - cfPassword: ' + this.retypePassword +
    //                 'isAccepted: ' + this.isAccepted + 'dob: ' + this.dob
    
    const registerDTO: RegisterDTO = {
      fullname: this.fullName,
      phone_number: this.phone_number,
      email: this.email,
      address: this.address,
      password: this.password,
      retype_password: this.retypePassword,
      dob: this.dob,
      facebook_account_id: 0,
      google_account_id: 0,
      role_id: 2
    }
    this.userService.register(registerDTO).subscribe({
      next: (response: any) => {
        debugger
        this.router.navigate(['/login']);
      },
      complete: () => {
        debugger
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
    if(this.dob) {
      const today = new Date();
      const birthDay = new Date(this.dob);
      let age = today.getFullYear() - birthDay.getFullYear();
      const monthDiff = today.getMonth() - birthDay.getMonth();
      if(monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDay.getDate())) {
        age--;
      }

      if(age < 18) {
        this.registerForm.form.controls['dob'].setErrors({'invalidAge': true});
      } else {
        this.registerForm.form.controls['dob'].setErrors(null);
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
