import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
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

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['userId'];
      this.userService.getUserById(userId).subscribe(
        (user: User) => {
          this.user.userId = user.userId;
          this.user.firstName = user.firstName;
          this.user.lastName = user.lastName;
          this.user.email = user.email;
          this.user.permissions = user.permissions;

          user.permissions.forEach(permission => {
            switch (permission) {
              case "can_read_users":
                this.read = true;
                break;
              case "can_write_users":
                this.write = true;
                break;
              case "can_update_users":
                this.update = true;
                break;
              case "can_delete_users":
                this.delete = true;
                break;
              case "can_create_machine":
                this.createMachine = true;
                break;
              case "can_search_machine":
                this.searchMachine = true;
                break;
              case "can_stop_machine":
                this.stopMachine = true;
                break;
              case "can_start_machine":
                this.startMachine = true;
                break;
              case "can_restart_machine":
                this.restartMachine = true;
                break;
              case "can_destroy_machine":
                this.destroyMachine = true;
                break;
              default:
                break;
            }
          });

        }
      );
    });
  }

  saveUser(): void {

    if(this.write && !this.user.permissions.includes("can_write_users"))this.user.permissions.push("can_write_users");
    if(this.read && !this.user.permissions.includes("can_read_users")) this.user.permissions.push("can_read_users");
    if(this.delete && !this.user.permissions.includes("can_delete_users"))this.user.permissions.push("can_delete_users");
    if(this.update && !this.user.permissions.includes("can_update_users"))this.user.permissions.push("can_update_users");

    if(this.createMachine && !this.user.permissions.includes("can_create_machine"))this.user.permissions.push("can_create_machine");
    if(this.destroyMachine && !this.user.permissions.includes("can_destroy_machine"))this.user.permissions.push("can_destroy_machine");
    if(this.searchMachine && !this.user.permissions.includes("can_search_machine"))this.user.permissions.push("can_search_machine");
    if(this.restartMachine && !this.user.permissions.includes("can_restart_machine"))this.user.permissions.push("can_restart_machine");
    if(this.startMachine && !this.user.permissions.includes("can_start_machine"))this.user.permissions.push("can_start_machine");
    if(this.stopMachine && !this.user.permissions.includes("can_stop_machine"))this.user.permissions.push("can_stop_machine");

    this.userService.updateUser(this.user).subscribe(
      () => {

      },
    );
  }
}
