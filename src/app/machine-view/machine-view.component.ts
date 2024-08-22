import { Component, OnInit } from '@angular/core';
import {Machine, MachineStatus, QueryRequest, Schedule, User} from '../model';
import { MachineService } from '../services/machine.service';
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-machine-search',
  templateUrl: './machine-view.component.html',
  styleUrls: ['./machine-view.component.css']
})
export class MachineViewComponent implements OnInit {
  machines: Machine[] = [];

  searchName: string = "";
  searchStatus: string[] = [];
  searchStartDate: Date = new Date();
  searchEndDate: Date = new Date();

  scheduledOperation: Schedule | null = null;

  query: QueryRequest = {
    name: '',
    status: [],
    startDate: new Date(),
    endDate: new Date()
  };

  selectedMachine: Machine = {
    id: 0,
    name: "",
    status: MachineStatus.STOPPED,
    createdBy: {
      firstName: '',
      lastName: '',
      email: '',
      permissions: []
    },
    dateCreated: new Date(),
    active: false
  }

  authorities: String[] = this.userService.getAuthorities();

  constructor(private machineService: MachineService, private userService: UserService) { }

  ngOnInit(): void {
    this.machineService.getMachines().subscribe((data: Machine[]) =>{
      this.machines = data;
    });
  }

  updateSelection(status: string, event: any) {
    if (event.target.checked) {
      this.searchStatus.push(status);
    } else {
      const index = this.searchStatus.indexOf(status);
      if (index > -1) {
        this.searchStatus.splice(index, 1);
      }
    }
  }

  searchMachines(): void {
    this.query.name = this.searchName;
    this.query.status = this.searchStatus;
    this.query.startDate = this.searchStartDate;
    this.query.endDate = this.searchEndDate;
    this.machineService.searchMachine(this.query).subscribe((data: Machine[]) => {
      this.machines = data;
    });
  }

  scheduleDate(schedule: Schedule) {
    this.scheduledOperation = schedule;
    schedule.machine = this.selectedMachine;
    this.machineService.scheduleOperation(this.scheduledOperation).subscribe();
  }

  hasPermission(permission: string): boolean {
    console.log(permission);
    const authorities = localStorage.getItem('authorities');
    if (authorities !== null) {
      if (authorities.includes(permission)) {
        return true;
      }
    }
    return false;
  }
  deleteMachine(id: number){
    return this.machineService.deleteMachine(id).subscribe();
  }

  selectMachine(machine: Machine){
    this.selectedMachine = machine;
}

  startMachine(machine: Machine){
    this.machineService.startMachine(machine).subscribe();
  }
  restartMachine(machine: Machine){
    this.machineService.restartMachine(machine).subscribe();
  }
  stopMachine(machine: Machine){
    this.machineService.stopMachine(machine).subscribe();
  }
}



