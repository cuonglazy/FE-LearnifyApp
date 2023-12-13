import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserProfileComponent } from "../list/user-profile.component";
import { UpdateUserProfileComponent } from "../update-user-profile/update.user-profile.component";
import { UserProfileRoutingResolveService } from "./user-profile-routing-resolve.service";
import { UserUpdateComponent } from "../user-update/user-update.component";

const routes: Routes = [
  {
    path: "",
    component: UserProfileComponent,
  },
  {
    path: "/update",
    component: UpdateUserProfileComponent,
  },
  {
    path: ":id/edit",
    component: UserUpdateComponent,
    resolve: {
      user: UserProfileRoutingResolveService,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfileRoutingModule {}