import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Discount, IDiscount } from '../discount.model';
import { Observable, of, EMPTY } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';
import { DiscountService } from 'src/app/service/discount.service';

@Injectable({ providedIn: 'root' })
export class DiscountRoutingResolveService implements Resolve<IDiscount> {
    constructor(protected service: DiscountService, protected router: Router) {}
  
    resolve(route: ActivatedRouteSnapshot): Observable<IDiscount> | Observable<never> {
      const id = route.params['id'];
      if (id) {
        return this.service.findOne(id).pipe(
          mergeMap((discount: HttpResponse<Discount>) => {
            if (discount.body) {
              return of(discount.body);
            } else {
              this.router.navigate(['404']);
              return EMPTY;
            }
          })
        );
      } 
      return of(new Discount());
    }
  }