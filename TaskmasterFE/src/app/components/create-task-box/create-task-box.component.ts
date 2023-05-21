import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  //TODO: Repeating tasks

  // Input for the day's date
  @Input() dayDate: string = "";

  // Form group variable declaration
  newTaskForm!: FormGroup;

  //Error message
  errorMessage: string = '';

  // Output for saving a new task event
  @Output() taskSaved = new EventEmitter<boolean>();

  //Array with category options
  categoryOptions: string[] = ['Work', 'Entertainment', 'Sleep', 'Fitness', 'Education', 'Medical', 'Food', 'Shopping', 'Household', 'Beauty', 'Travel', 'Other'];

  //Array with repetition options
  repetitionOptions: string[] = ['One time', 'Daily', 'Every Weekday', 'Weekly', 'Bi-Weekly', 'Monthly (weekday)', 'Monthly (day)', 'Yearly', 'Custom'];

  //TODO: Add custom repetition fields 
  //TODO: Think of how to handle on backend

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    //initializing form group with control and validation
    this.newTaskForm = new FormGroup({
      taskName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      taskDate: new FormControl(this.getDayDate(), Validators.required),
      repetition: new FormControl('One time'),
      repeatStopDate: new FormControl({ value: this.getDayDate(), disabled: true }, Validators.required),
      startTime: new FormControl(''),
      endTime: new FormControl(''),
      taskNote: new FormControl('', Validators.maxLength(200)),
      category: new FormControl('Other')
    });

    this.updateMonthlyRepetition();
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
  * Returns repetition variable of the newTaskForm form
  */
  get repetition() {
    return this.newTaskForm.get('repetition');
  }

  /**
  * Returns repeatStopDate variable of the newTaskForm form
  */
  get repeatStopDate() {
    return this.newTaskForm.get('repeatStopDate');
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
      taskStartTime: this.checkTimeFormat(this.startTime?.value, this.taskDate?.value),
      taskEndTime: this.checkTimeFormat(this.endTime?.value, this.taskDate?.value),
      categoryName: this.category?.value,
      taskUUID: '',
      taskStatus: 0,
      repetition: this.repetition?.value
    };

    /**
    * Sends task object and gets a response
    */
    this.taskService.saveNewTask(newTask).subscribe({
      next: (res) => {
        console.log(res);//TODO: delete
        this.errorMessage = '';
      },
      error: (err) => {
        console.log(err); //TODO: delete
        this.errorMessage = err;
      },
      complete: () => {
        console.log('Success') //TODO: delete
        this.taskSaved.emit(true);
      }
    });
  }

  /**
  * Checks if time is in right format
  */
  private checkTimeFormat(time: string, date: string): string {
    if (time === "") {
      return "";
    } else {
      return `${date} ${time}:00`;
    }
  }

  /**
  * Updates the monthly repetition options to include weekday and month day
  */
  private updateMonthlyRepetition(): void {
    const todayDate: Date = new Date(this.dayDate);
    const weekday: string = this.getWeekday(todayDate);

    this.repetitionOptions[5] = `Monthly (every ${weekday})`;
    this.repetitionOptions[6] = `Monthly (on day ${todayDate.getDate()})`;
  }

  /**
  * Returns a weekday string from given date
  */
  private getWeekday(date: Date): string {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return weekdays[date.getDay()];
  }


  /**
   * Toggles the display value of the repetition options
   */
  toggleRepetition(): void {
    const repetitionOptions = document.getElementById('repetitionOptions');

    // display if not block display
    if (repetitionOptions!.style.display != 'block') {
      repetitionOptions!.style.display = 'block';

      // listen to the value of the repetition selection
      const repetitionElement = document.getElementById('repetition');
      repetitionElement?.addEventListener('change', () => {
        // if value is one time then disable the date input
        if (this.repetition?.value != 'One time') {
          this.repeatStopDate?.enable();
        } else {
          this.repeatStopDate?.disable();
        }
      });
    } else {
      repetitionOptions!.style.display = 'none';
    }
  }

}