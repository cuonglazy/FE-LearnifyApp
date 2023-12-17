import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { LoginComponent } from './pages/login/login.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { TeacherProfileComponent } from './pages/teacher-profile/teacher-profile.component';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { WatchVideoComponent } from './pages/watch-video/watch-video.component';
import { CartComponent } from './pages/cart/cart.component';
import { PurchasedCourseComponent } from './pages/purchased-course/purchased-course.component';
import { PurchaseHistoryComponent } from './pages/purchase-history/purchase-history.component';
import { CourseRoutingResolveService } from 'src/app/pages/course/route/course-routing-resolve.service';
const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'courses', component: CoursesComponent},
  { path: 'login', component: LoginComponent},
  { path: ':id/playlist', 
    component: PlaylistComponent,
    resolve: {
      course:  CourseRoutingResolveService
    }
},
  { path: 'profile', component: ProfileComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'teacher-profile', component: TeacherProfileComponent},
  { path: 'teachers', component: TeachersComponent},
  { path: 'watch-video', component: WatchVideoComponent},
  { path: 'cart', component: CartComponent},
  { path: 'purchased-course', component: PurchasedCourseComponent},
  { path: 'purchased-history', component: PurchaseHistoryComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
