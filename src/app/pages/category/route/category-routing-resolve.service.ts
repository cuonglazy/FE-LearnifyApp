import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { CategoryService } from "src/app/service/category.service";
import { EMPTY, Observable, mergeMap, of } from "rxjs";
import { Category, ICategory } from "../category.model";
import { HttpResponse } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class CategoryRoutingResolveService implements Resolve<ICategory> {
  constructor(
    protected categoryService: CategoryService,
    protected route: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<ICategory> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.categoryService.find(id).pipe(
        mergeMap((category: HttpResponse<Category>) => {
          if (category.body) {
            return of(category.body);
          } else {
            this.route.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Category());
  }
}
