import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { star } from 'ngx-bootstrap-icons';
import { Task } from 'src/app/entities/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-create-task-box',
  templateUrl: './create-task-box.component.html',
  styleUrls: ['./create-task-box.component.scss']
})
export class CreateTaskBoxComponent implements OnInit {
  // Input for the day's date
  @Input() dayDate: string = "";

  // Form group variable declaration
  newTaskForm!: FormGroup;

  //Error message
  errorMessage: string = '';

  //Array with category options
  categoryOptions: string[] = ['Work', 'Entertainment', 'Sleep', 'Fitness', 'Education', 'Medical', 'Food', 'Shopping', 'Household', 'Beauty', 'Travel', 'Other'];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    //initializing form group with control and validation
    this.newTaskForm = new FormGroup({
      taskName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      // taskDate: new FormControl(this.getCurrentLocalDate(), Validators.required),
      taskDate: new FormControl(this.getDayDate(), Validators.required),
      startTime: new FormControl(''),
      endTime: new FormControl(''),
      taskNote: new FormControl('', Validators.maxLength(200)),
      category: new FormControl('Other'),
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
  * Returns category variable of the newTaskForm form
  */
  get category() {
    return this.newTaskForm.get('category');
  }

  /**
  * Function to get the date in the required YYYY-MM-DD format
  */
  private getDayDate(): string {
    const localDate = new Date(this.dayDate);
    return localDate.toISOString().substring(0, 10);
  }

  /**
  * Function to get the current time and return a string
  */
  private getCurrentTime(): string {
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

    //save the task to DB
    this.saveNewTask();
  }

  /**
  * Saves a new task using the TaskService and returns a response message.
  */
  private saveNewTask(): void {
    // creates a new task to send to the backend
    const newTask: Task = {
      taskName: this.taskName?.value,
      taskDate: this.taskDate?.value,
      taskNote: this.taskNote?.value,
      // taskStartTime: this.startTime?.value,
      // taskEndTime: this.endTime?.value,
      taskStartTime: this.checkTimeFormat(this.startTime?.value, this.taskDate?.value),
      taskEndTime: this.checkTimeFormat(this.endTime?.value, this.taskDate?.value),
      categoryName: this.category?.value,
      taskUUID: '',
      taskStatus: 0
    };

    //changes time format if nothing was entered
    // newTask.taskStartTime = this.checkTimeFormat(newTask.taskStartTime);

    //TODO: Update calendar count and taskBox after adding new task
    //TODO: Default date should be of the selected day when adding


    //Sends task object and gets a response
    this.taskService.saveNewTask(newTask).subscribe({
      next: (res) => {
        console.log(res);
        this.errorMessage = '';
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err;
      },
      complete: () => console.log('Success')
    });
  }

  // checks if time is in right format
  private checkTimeFormat(time: string, date: string): string {
    if (time === "") {
      return "";
    } else {
      return `${date} ${time}:00`;
    }
  }
}