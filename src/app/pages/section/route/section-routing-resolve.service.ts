import { Injectable } from "@angular/core";
import { ISection, Section } from "../section.model";
import { SectionService } from "src/app/service/section.service";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { Observable, mergeMap, of } from "rxjs";
import { HttpResponse } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class SectionRoutingResolveService implements Resolve<ISection>{
    constructor(protected service: SectionService, protected router: Router) {}
    resolve(route: ActivatedRouteSnapshot): Observable<ISection> | Observable<never> {
        const id = route.params['id'];
        if (id) {
            return this.service.findOne(id).pipe(
                mergeMap((section: HttpResponse<Section>)=>{
                    if(section.body){
                        return of(section.body);
                    }else{
                        this.router.navigate(['404']);
                        return of(null);
                    }
                })
            );
        } 
        return of(new Section());
      }
}