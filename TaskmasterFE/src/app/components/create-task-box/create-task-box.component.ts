import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-task-box',
  templateUrl: './create-task-box.component.html',
  styleUrls: ['./create-task-box.component.scss']
})
export class CreateTaskBoxComponent implements OnInit {

  newTaskForm = new FormGroup({
    taskName: new FormControl(''),
    taskDate: new FormControl(''),
    startTime: new FormControl(''),
    endTime: new FormControl(''),
    taskNote: new FormControl('')
  });

  //TODO: Add validation
  //TODO: Add actual saving on DB

  constructor() { }

  ngOnInit(): void {
    this.newTaskForm.setValue({
      taskName: 'Name of the task',
      taskDate: this.getCurrentLocalDate(),
      startTime: this.getCurrentTime(),
      endTime: this.getCurrentTime(),
      taskNote: null
    });
  }

  /**
   * Function to get the current local date in the required YYYY-MM-DD format:
   */
  getCurrentLocalDate(): string {
    const currentDate = new Date();
    const localDate = new Date(currentDate.getTime() - currentDate.getTimezoneOffset() * 60000);
    return localDate.toISOString().substring(0, 10);
  }

  /**
  * Function to get the current time and return a string
  */
  getCurrentTime(): string {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
  }
}
