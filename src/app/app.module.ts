import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";
import { CommonModule } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptors } from './interceptors/token.interceptors';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptors,
    multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
