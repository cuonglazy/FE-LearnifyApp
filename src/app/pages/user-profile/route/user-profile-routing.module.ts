import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserProfileComponent } from "../list/user-profile.component";
import { UserEditComponent } from "../user-edit/user-edit.component";
import { UpdateUserProfileComponent } from "../update-user-profile/update.user-profile.component";
import { UserProfileRoutingResolveService } from "./user-profile-routing-resolve.service";

const routes: Routes = [
  {
    path: "",
    component: UserProfileComponent,
  },
  {
    path: "update",
    component: UpdateUserProfileComponent,
  },
  {
    path: ":id/edit",
    component: UserEditComponent,
    resolve:{
      user: UserProfileRoutingResolveService,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfileRoutingModule {}