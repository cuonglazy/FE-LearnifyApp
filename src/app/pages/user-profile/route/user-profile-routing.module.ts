import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserProfileComponent } from "../list/user-profile.component";
import { UpdateUserProfileComponent } from "../update/update.user-profile.component";

const routes: Routes = [
  {
    path: "",
    component: UserProfileComponent,
  },
  {
    path: "new",
    component: UpdateUserProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfileRoutingModule {}
