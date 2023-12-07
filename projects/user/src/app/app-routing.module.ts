import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CoursesComponent } from './courses/courses.component';
import { LoginComponent } from './login/login.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';
import { TeachersComponent } from './teachers/teachers.component';
import { UpdateComponent } from './update/update.component';
import { WatchVideoComponent } from './watch-video/watch-video.component';
import { CartComponent } from './cart/cart.component';
import { PurchasedCourseComponent } from './purchased-course/purchased-course.component';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'courses', component: CoursesComponent},
  { path: 'login', component: LoginComponent},
  { path: 'playlist', component: PlaylistComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'teacher-profile', component: TeacherProfileComponent},
  { path: 'teachers', component: TeachersComponent},
  { path: 'update', component: UpdateComponent},
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
