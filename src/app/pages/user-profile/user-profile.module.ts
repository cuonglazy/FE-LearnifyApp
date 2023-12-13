import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserProfileRoutingModule } from "./route/user-profile-routing.module";
import { ClipboardModule } from "ngx-clipboard";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UserProfileComponent } from "./list/user-profile.component";
import { UpdateUserProfileComponent } from "./update-user-profile/update.user-profile.component";
import { BrowserModule } from "@angular/platform-browser";
import { UserUpdateComponent } from './user-update/user-update.component';


@NgModule({
  imports: [UserProfileRoutingModule, ClipboardModule, FormsModule, NgbModule, CommonModule, BrowserModule, ReactiveFormsModule],
  declarations: [UserProfileComponent, UpdateUserProfileComponent, UserUpdateComponent]
})
export class UserProfileModule {}
