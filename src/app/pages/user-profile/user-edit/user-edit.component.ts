import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, finalize } from 'rxjs';
import { UpdateUserDTO } from 'src/app/dtos/user/update.user.dto';
import { Role } from 'src/app/models/role';
import { IUser, User } from 'src/app/models/user';
import { UserResponse } from 'src/app/responses/users/user.response';
import { TokenService } from 'src/app/service/token.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
})
export class UserEditComponent implements OnInit {

  userEditForm: FormGroup;
  userResponse?: UserResponse | null;
  token:string = '';
  isSaving = false;
  userCloneData: any;
  roleData: Role;

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router,
    private formBuider: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
    this.userEditForm = this.formBuider.group({
      id: [''],
      fullname: [''],
      phone_number: ['', Validators.minLength(10)],
      email: ['', Validators.minLength(6)],
      is_active: [true],
      date_of_birth: [Date.now()],
      password: ['', [Validators.minLength(6)]],
      retypePassword: ['', [Validators.minLength(6)]],
      address: [''],
      role_id: [null],
    })
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((userData) => {
      this.updateForm(userData.user)
      console.warn(userData);
      this.userCloneData = userData.user;
    });
  }
  
  protected updateForm(user: User): void {
    this.userEditForm.patchValue({
      //Cach 1: dung spread operator
      ...user,
      //Cach 2:
      // id: user.id,
      // fullname: user.fullname,
      // email: user.email ?? user.email,
      // phone_number: user.phone_number,
      // date_of_birth: user.date_of_birth,
      // address: user.address,
      // password: user.password
    })
    console.log(this.userEditForm);
    
  }

  passwordMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get('password')?.value;
      const retypedPassword = formGroup.get('retype_password')?.value;
      if (password !== retypedPassword) {
        return { passwordMismatch: true };
      }
  
      return null;
    };
  }

  save(): void {
    const user = this.createForm();
    // Update profile cho chinh minh
    // const token = this.tokenService.getToken();
    // if(user.id) {
    //   this.subscribeToSaveResponse(this.userService.updateUserDetail(token ,user))
    // } 
    // if(!user.id) {
    //   alert('Người dùng chưa tồn tại để cập nhật!')
    // }

    //Update profile theo ID
    if(user.id) {
      this.subscribeToSaveResponse(this.userService.updateUserById(user.id, user))
      alert("Thành công")
    } 
    if(!user.id) {
      alert('Người dùng chưa tồn tại để cập nhật!')
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<User>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    })
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  previousState(): void {
    window.history.back();
  }

  onRoleChange() {
    const role_id = this.userEditForm.get('role_id')!.value;
    console.log(role_id);
    // Bạn có thể thực hiện các thao tác khác với role_id ở đây
  }

  createForm(): User {
    const role_id = this.userEditForm.get(['role_id'])!.value;

    for (const role of this.roles) {
      if (role.id === role_id.id) {
        this.roleData = role;
      }
    }

    return {
      ...new IUser(),
      id: this.userEditForm.get(['id'])!.value,
      fullname: this.userEditForm.get(['fullname'])!.value,
      email: this.userEditForm.get(['email'])!.value,
      phone_number: this.userEditForm.get(['phone_number'])!.value,
      date_of_birth: this.userEditForm.get(['date_of_birth'])!.value,
      address: this.userEditForm.get(['address'])!.value,
      password: this.userEditForm.get(['password'])!.value,
      is_active: this.userEditForm.get(['is_active'])!.value,
      role_id: this.roleData
    };
  }

  roles: Role[] = [
    {
      id: 1,
      name: 'admin',
      user: null
    },
    {
      id: 2,
      name: 'user',
      user: null
    },
    {
      id: 3,
      name: 'teacher',
      user: null
    },
  ];

  // roleData : any;
  // createForm(): User {
  //   const role_id = this.userEditForm.get(['role_id'])!.value;
  //   for (const role of this.roles) {
  //     if (role.id === role_id) {
  //       this.roleData = role;
  //     }
  //   }
  //   return {
  //     ...new IUser(),
  //     id: this.userEditForm.get(['id'])!.value,
  //     fullname: this.userEditForm.get(['fullname'])!.value,
  //     email: this.userEditForm.get(['email'])!.value,
  //     phone_number: this.userEditForm.get(['phone_number'])!.value,
  //     date_of_birth: this.userEditForm.get(['date_of_birth'])!.value,
  //     address: this.userEditForm.get(['address'])!.value,
  //     password: this.userEditForm.get(['password'])!.value,
  //     is_active: this.userEditForm.get(['is_active'])!.value,
  //     role_id: this.roleData
  //   }
  // }
}
