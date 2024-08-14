import { Component } from '@angular/core';
import {User} from "../model";
import {LoginService} from "../services/login.service";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    permissions: []
  };

  read: boolean = false;
  write: boolean = false;
  delete: boolean = false;
  update: boolean = false;
  searchMachine: boolean = false;
  startMachine: boolean = false;
  stopMachine: boolean = false;
  restartMachine: boolean = false;
  createMachine: boolean = false;
  destroyMachine: boolean = false;

  help: string = '';

  error: string | null = null;

  constructor(private userService: UserService) {}

  onSubmit() {
    if(this.write)this.user.permissions.push("can_write_users");
    if(this.read)this.user.permissions.push("can_read_users");
    if(this.delete)this.user.permissions.push("can_delete_users");
    if(this.update)this.user.permissions.push("can_update_users");
    if(this.createMachine)this.user.permissions.push("can_create_machine");
    if(this.destroyMachine)this.user.permissions.push("can_destroy_machine");
    if(this.searchMachine)this.user.permissions.push("can_search_machine");
    if(this.restartMachine)this.user.permissions.push("can_restart_machine");
    if(this.startMachine)this.user.permissions.push("can_start_machine");
    if(this.stopMachine)this.user.permissions.push("can_stop_machine");

    this.userService.addUser(this.user).subscribe(
      () => {
        this.error = null;
      }
    );
  }
}
