import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-task-box',
  templateUrl: './create-task-box.component.html',
  styleUrls: ['./create-task-box.component.scss']
})
export class CreateTaskBoxComponent implements OnInit {
  newTaskForm!: FormGroup;


  //TODO: Add validation
  //TODO: Add actual saving on DB

  constructor() { }

  ngOnInit(): void {
    this.newTaskForm = new FormGroup({
      taskName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      taskDate: new FormControl(this.getCurrentLocalDate(), Validators.required),
      startTime: new FormControl(''),
      endTime: new FormControl(''),
      taskNote: new FormControl('', Validators.maxLength(200))
    });
  }

  /**
   * Returns taskName variable of the newTaskForm form
   */
  get taskName() {
    return this.newTaskForm.get('taskName');
  }

  /**
  * Returns taskDate variable of the newTaskForm form
  */
  get taskDate() {
    return this.newTaskForm.get('taskDate');
  }

  /**
  * Returns startTime variable of the newTaskForm form
  */
  get startTime() {
    return this.newTaskForm.get('startTime');
  }

  /**
   * Returns endTime variable of the newTaskForm form
  */
  get endTime() {
    return this.newTaskForm.get('endTime');
  }

  /**
  * Returns taskNote variable of the newTaskForm form
  */
  get taskNote() {
    return this.newTaskForm.get('taskNote');
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

  /**
  * Checks if the form has been entered correctly
  */
  checkForm(): void {
    // required field check
    if (this.newTaskForm.invalid) {
      this.newTaskForm.markAllAsTouched();
      return;
    }
  }
}