import {Component} from '@angular/core';
import {Machine, MachineStatus, User} from '../model';
import {MachineService} from '../services/machine.service';
import {UserService} from "../services/user.service";
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-machine-registration',
  templateUrl: './machine-registration.component.html',
  styleUrls: ['./machine-registration.component.css']
})
export class MachineRegistrationComponent {

    name: string = "";
    status: MachineStatus = MachineStatus.STOPPED;
    active: boolean = true;

  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    permissions: []
  };


  error: string | null = null;

  constructor(private machineService: MachineService) {}

  onSubmit() {
    const username = localStorage.getItem('email');

    if(username)
      this.machineService.addMachine(username, this.status, this.active).subscribe(
        () => {
          this.error = null;
        }
      );
    }

}
