import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateUserDTO } from 'src/app/dtos/user/update.user.dto';
import { UserImage } from 'src/app/models/user.image';
import { UserResponse } from 'src/app/responses/users/user.response';
import { TokenService } from 'src/app/service/token.service';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environments/environment';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
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
        
      },
      error: (error: any) => {
        
        alert(error.error.message);
      }
    })
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
            alert("Thành công")
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

  onFileSelected2(imageInput: any): void {
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
  ////2 hàm dưới này để convert chọn ảnh khi click vào ảnh

  onFileSelected(event: any): void {
    const profileImage = document.getElementById('profileImage') as HTMLImageElement;

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        profileImage.src = e.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onImageClick(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

}
