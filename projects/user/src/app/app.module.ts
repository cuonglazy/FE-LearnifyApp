import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { TeacherProfileComponent } from './pages/teacher-profile/teacher-profile.component';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { WatchVideoComponent } from './pages/watch-video/watch-video.component';
import { CartComponent } from './pages/cart/cart.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { PurchaseHistoryComponent } from './pages/purchase-history/purchase-history.component';
import { PurchasedCourseComponent } from './pages/purchased-course/purchased-course.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { TokenInterceptors } from 'src/app/interceptors/token.interceptors';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    CoursesComponent,
    HomeComponent,
    LoginComponent,
    PlaylistComponent,
    ProfileComponent,
    RegisterComponent,
    TeacherProfileComponent,
    TeachersComponent,
    WatchVideoComponent,
    CartComponent,
    PurchaseHistoryComponent,
    PurchasedCourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    CommonModule,
    NgbModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptors,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
