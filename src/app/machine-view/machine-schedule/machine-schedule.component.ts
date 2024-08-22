import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MachineOperation, Schedule } from 'src/app/model';

@Component({
  selector: 'app-machine-schedule',
  templateUrl: './machine-schedule.component.html',
  styleUrls: ['./machine-schedule.component.css']
})
export class MachineScheduleComponent {
  @Output() dateSelected: EventEmitter<Schedule> = new EventEmitter<Schedule>();

  seconds: number = 0;
  minutes: number = 0;
  hours: number = 0;
  day: number = 1;
  month: number = 1;
  year: number = new Date().getFullYear();

  operationType: MachineOperation = MachineOperation.STOP;

  operations = Object.values(MachineOperation);

  onDateSelect() {
    const selectedDate = new Date(this.year, this.month - 1, this.day, this.hours, this.minutes, this.seconds);
    const schedule: Schedule = {
      executionDateTime: selectedDate,
      machineOperation: this.operationType
    }
    this.dateSelected.emit(schedule);
  }

}
