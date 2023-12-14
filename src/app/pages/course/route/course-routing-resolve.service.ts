import { Course, ICourse } from './../course.model';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { CourseService } from 'src/app/service/course.service';
import { EMPTY, Observable, mergeMap, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseRoutingResolveService implements Resolve<ICourse>{

  constructor(
    protected courseService: CourseService,
    protected router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<ICourse> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.courseService.findOne(id).pipe(
        mergeMap((course: HttpResponse<Course>) => {
          if (course.body) {
            return of(course.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Course());
  }
}
