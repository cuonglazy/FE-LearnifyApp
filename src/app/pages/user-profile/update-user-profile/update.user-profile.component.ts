import { Component, OnInit  } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserResponse } from 'src/app/responses/users/user.response';
import { TokenService } from 'src/app/service/token.service';
import { UserService } from 'src/app/service/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { UpdateUserDTO } from 'src/app/dtos/user/update.user.dto';
import { User } from 'src/app/models/user';
import { UserImage } from 'src/app/models/user.image';
import { environment } from 'src/environments/environment';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-update.user-profile',
  templateUrl: './update.user-profile.component.html',
})

export class UpdateUserProfileComponent implements OnInit {
  userProfileForm: FormGroup;
  imageForm: FormGroup;
  userResponse?: UserResponse | null;
  token: string = '';
  userCloneData: any;
  selectedFile: ImageSnippet;
  userImageData: any; 
  selectedImageFile: File | null = null;

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private router: Router,
    private formBuider: FormBuilder,
    private activedRoute: ActivatedRoute
  ) {
    this.userProfileForm = this.formBuider.group({
      fullname: [''],
      phone_number: ['', Validators.minLength(10)],
      email: ['', Validators.minLength(6)],
      date_of_birth: [Date.now()],
      password: ['', [Validators.minLength(6)]],
      retypePassword: ['', [Validators.minLength(6)]],
      address: ['']
    })
  }

  ngOnInit(): void {
    debugger
    this.token = this.tokenService.getToken() ?? ''
    this.userService.getUserDetails(this.token).subscribe({
      next: (response: any) => {

        /*
          Phần load ảnh ra HTML và đọc ảnh bằng API
        */
        if(response.user_images && response.user_images.length > 0) {
            response.user_images.forEach((user_image:UserImage) => {
              user_image.image_url = `${environment.apiBaseUrl}/users/readImage/${user_image.image_url}`
            });
        }
        this.userImageData = response.user_images;
        

        this.userResponse = {  
          ...response,
          date_of_birth: new Date(response.date_of_birth),
        };
        this.userProfileForm.patchValue({
          fullname: this.userResponse?.fullname ?? '',
          phone_number: this.userResponse?.phone_number ?? '',
          email: this.userResponse?.email ?? '',
          password: this.userResponse?.password ?? '',
          address: this.userResponse?.address ?? '',
          image_url: this.userResponse?.image_url ?? '',
          date_of_birth: this.userResponse?.date_of_birth.toISOString().substring(0, 10),
        })
        this.userService.saveUserResponseToLocalStorage(this.userResponse);
        this.userCloneData = response;
        // this.router.navigate(['/system-admin/dashboard']);
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        debugger;
        alert(error.error.message);
      }
    })
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
    debugger
    if (this.userProfileForm) {
      const updateUserDTO: UpdateUserDTO = {
        fullname: this.userProfileForm.get('fullname')?.value,
        address: this.userProfileForm.get('address')?.value,
        password: this.userProfileForm.get('password')?.value,
        email: this.userProfileForm.get('email')?.value,
        phone_number: this.userProfileForm.get('phone_number')?.value,
        retype_password: this.userProfileForm.get('retype_password')?.value,
        date_of_birth: this.userProfileForm.get('date_of_birth')?.value
      };
  
      this.userService.updateUserDetail(this.token, updateUserDTO)
        .subscribe({
          next: (response: any) => {
            const passwordClone = Object.assign({}, response)
            if(response.password != passwordClone.password) {
              this.userService.removeUserFromLocalStorage();
              this.tokenService.removeToken();
              this.router.navigate(['/login']);
            }
            alert("Thành công!")
          },
          error: (error: any) => {
            alert(error.error.message);
          }
        });
    } else {
      if (this.userProfileForm.hasError('passwordMismatch')) {        
        alert('Mật khẩu và mật khẩu gõ lại chưa chính xác')
      }
    }
  }
  
  onFileSelected(imageInput: any): void {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);
      
      this.userService.uploadImage(this.selectedFile.file).subscribe(
        (res) => {
          console.warn("thanh cong");
          this.ngOnInit()
        },
        (err) => {
          console.warn("that bai");
        
        })
    });
    reader.readAsDataURL(file);
  }

  // saveImage(): void {
  //   // Add any additional logic for saving if needed
  //   // Call the postImageForUser function with the selected file
  //   if (this.selectedImageFile) {
  //     this.postImageForUser(this.selectedImageFile); // Replace with the appropriate user details
  //   }
  // }

  // // Add this function to call the service method
  // postImageForUser(files: File): void {
  //   this.userService.postImageForUser(files)
  //     .subscribe(
  //       (response: any) => {
  //         console.log('Image uploaded successfully:', response.files);
  //         // Handle success, if needed
  //       },
  //       (error: any) => {
  //         console.error('Error uploading image:', error);
  //         // Handle error, if needed
  //       }
  //     );
  // }

  // openFilePicker(): void {
  //   const fileInput: HTMLElement = document.getElementById('image-file');
  //   fileInput.click();
  // }
  
  // headleFileInput(event: any): void {
  //   const files: FileList = event.target.files;
  //   if (files.length > 0) {
  //     const file: File = files[0];
  //     const imagePlay: HTMLImageElement = document.getElementById('image-play') as HTMLImageElement;
  
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       // Đảm bảo rằng e.target.result là URL hợp lệ cho hình ảnh
  //       if (typeof e.target.result === 'string') {
  //         imagePlay.src = e.target.result;
  //       }
  //     };
  
  //     // Đọc file hình ảnh và gán URL cho imagePlay.src
  //     reader.readAsDataURL(file);
  //   }
  // }
}
