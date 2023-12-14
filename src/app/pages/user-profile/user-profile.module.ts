import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserProfileRoutingModule } from "./route/user-profile-routing.module";
import { ClipboardModule } from "ngx-clipboard";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UserProfileComponent } from "./list/user-profile.component";
import { UserEditComponent } from './user-edit/user-edit.component';
import { UpdateUserProfileComponent } from "./update-user-profile/update.user-profile.component";

@NgModule({
  imports: [UserProfileRoutingModule, ClipboardModule, FormsModule, NgbModule, CommonModule, ReactiveFormsModule],
  declarations: [UserProfileComponent, UserEditComponent,UpdateUserProfileComponent],
})
export class UserProfileModule {}
