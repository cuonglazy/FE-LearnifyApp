import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CoursesComponent } from './courses/courses.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';
import { TeachersComponent } from './teachers/teachers.component';
import { UpdateComponent } from './update/update.component';
import { WatchVideoComponent } from './watch-video/watch-video.component';
import { CartComponent } from './cart/cart.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';
import { PurchasedCourseComponent } from './purchased-course/purchased-course.component';
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
    UpdateComponent,
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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
