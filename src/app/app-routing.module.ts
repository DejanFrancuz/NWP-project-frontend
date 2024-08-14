import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ViewComponent} from "./view/view.component";
import {RegistrationComponent} from "./registration/registration.component";
import {UserEditComponent} from "./user-edit/user-edit.component";
import {ReadPermissionsGuard} from "./guards/can-read.guard";
import {AddPermissionsGuard} from "./guards/can-add.guard";
import {UpdatePermissionsGuard} from "./guards/can-update.guard";
import {MachineViewComponent} from "./machine-view/machine-view.component";
import {MachineRegistrationComponent} from "./machine-registration/machine-registration.component";
import {SearchMachinePermissionsGuard} from "./guards/can-search-machine.guard";
import {AddMachinePermissionsGuard} from "./guards/can-add-machine.guard";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "view",
    component: ViewComponent,
    canActivate: [ReadPermissionsGuard]
  },
  {
    path: "registration",
    component: RegistrationComponent,
    canActivate: [AddPermissionsGuard]
  },
  {
    path: 'edit/:userId',
    component: UserEditComponent,
    canActivate: [UpdatePermissionsGuard]
  },
  {
    path: 'machines',
    component: MachineViewComponent,
    canActivate: [SearchMachinePermissionsGuard]
  },
  {
    path: 'machines/registration',
    component: MachineRegistrationComponent,
    canActivate: [AddMachinePermissionsGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
