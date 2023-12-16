import { ElementRef, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateFn, CanActivate } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';
import { Router } from '@angular/router'; // Đảm bảo bạn đã import Router ở đây.
import { inject } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { UserResponse } from 'src/app/responses/users/user.response';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {
  userResponse?:UserResponse | null;
  readonly windowRef = this.el.nativeElement.ownerDocument.defaultView;

  constructor(
    private tokenService: TokenService, 
    private router: Router,
    private userService: UserService,
    private el: ElementRef
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isTokenExpired = this.tokenService.isTokenExpired();
    const isUserIdValid = this.tokenService.getUserId() > 0;
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
    const isAdmin = this.userResponse?.role_id.name == 'admin';
    debugger
    if (!isTokenExpired && isUserIdValid && isAdmin) {
      return true;
    } else {
      // Nếu không authenticated, bạn có thể redirect hoặc trả về một UrlTree khác.
      // Ví dụ trả về trang login:
      this.router.navigate(['/login']);
      // this.windowRef.location.href = 'http://localhost:4202/login';
      return false;
    }
  }  
}

export const AdminGuardFn: CanActivateFn = (
  next: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot
): boolean => {
  debugger
  return inject(AdminGuard).canActivate(next, state);
}