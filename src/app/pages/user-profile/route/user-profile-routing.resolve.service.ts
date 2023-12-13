import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { EMPTY, Observable, mergeMap, of } from "rxjs";
import { IUser, User } from "src/app/models/user";
import { UserService } from "src/app/service/user.service";

@Injectable({ providedIn: 'root' })
export class UserProfileRoutingResolveService implements Resolve<User> {
    constructor(protected service: UserService, protected router: Router) {}
  
    resolve(route: ActivatedRouteSnapshot): Observable<User> | Observable<never> {
      const id = route.paramMap.get['id'];
      if (id) {
        return this.service.getUserById(id).pipe(
          mergeMap((user: HttpResponse<IUser>) => {
            if (user.body) {
              return of(user.body);
            } else {
              this.router.navigate(['404']);
              return EMPTY;
            }
          })
        );
      } 
      return of(new IUser());
    }
  }