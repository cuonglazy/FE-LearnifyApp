import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserProfileRoutingModule } from "./route/user-profile-routing.module";
import { ClipboardModule } from "ngx-clipboard";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UserProfileComponent } from "./list/user-profile.component";
import { UpdateUserProfileComponent } from "./update/update.user-profile.component";
import { UserEditComponent } from './user-edit/user-edit.component';

@NgModule({
  imports: [UserProfileRoutingModule, ClipboardModule, FormsModule, NgbModule, CommonModule],
  declarations: [UserProfileComponent, UpdateUserProfileComponent, UserEditComponent],
})
export class UserProfileModule {}
