import { ILesson } from './../lesson.model';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Lesson } from '../lesson.model';
import { LessonService } from 'src/app/service/lesson.service';
import { EMPTY, Observable, mergeMap, of } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LessonRoutingResolveService implements Resolve<ILesson>{

  constructor(protected service: LessonService, protected router: Router) 
  {}
  
  resolve(route: ActivatedRouteSnapshot): Observable<ILesson> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.findById(id).pipe(
        mergeMap((lesson: HttpResponse<Lesson>) => {
          if (lesson.body) {
            return of(lesson.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Lesson());
  }
}
