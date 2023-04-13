import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from '../../entities/task';
import { lastValueFrom } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TaskBoxComponent } from '../task-box/task-box.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  // An array to store tasks
  tasks: Task[] = [];

  // A Map to store tasks for each day, with the key being the date string
  daysMap: Map<string, Task[]> = new Map();

  // An array of days of the week, starting with Monday
  daysOfTheWeek: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // An array of truncated days of the week, starting with Monday
  daysOfTheWeekTruncated: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // An array of truncated days of the week to 1 or 2 letters, starting with Monday
  daysOfTheWeekLetter: string[] = ["M", "Tu", "W", "Th", "F", "S", "Su"];

  // A Date object representing the first day of the current month
  firstMonthDay: Date = new Date();

  // A Date object representing the last day of the current month
  lastMonthDay: Date = new Date();

  // A string representing today's date in the format "Weekday Month Day Year"
  today: string = "";

  // A Date object representing the current full date
  currentDate = new Date();


  constructor(private taskService: TaskService, private modalService: NgbModal) { }

  //TODO: Delete tasks
  //TODO: Add task
  //TODO: Modify task

  ngOnInit(): void {
    this.start();
  }

  /**
  * Asynchronous method that initializes the calendar view by creating this month's calendar,
  * retrieving all tasks, and populating the day map with the corresponding tasks.
  */
  async start(): Promise<void> {
    this.createCalendar(this.currentDate);
    await this.getAllTasks();
    this.populateDayMap();
  }

  /**
  * Retrieves all tasks from the server and stores them in the 'tasks' array.
  * @returns A Promise that resolves when the task data has been loaded and stored.
  */
  async getAllTasks(): Promise<void> {
    // Wait for the task service to return the list of tasks, then store them in the 'tasks' array.
    await lastValueFrom(this.taskService.getTasks()).then(response => {
      this.tasks = response;
      // console.log(this.tasks); //TODO: DELETE
    });

    // Return a Promise that resolves immediately, indicating that the task data has been loaded and stored.
    return new Promise<void>(resolve => {
      resolve();
    });
  }

  /**  
  * Initializes the current month's calendar by setting the component's today, firstMonthDay, and lastMonthDay properties.
  * Populates the daysMap property with empty arrays for the days before the first day of the month.
  * Populates the daysMap property with a Date string key for each day in the month, with an empty array value for each.
  */
  createCalendar(currentDate: Date): void {
    // Get the current date and set today to current date as a string
    // const currentDate = new Date();
    this.today = currentDate.toDateString();

    // Set current year and month
    const currentYear: number = currentDate.getFullYear();
    const currentMonth: number = currentDate.getMonth() + 1;

    // Create a new Date object for the first day of the month
    const date: number = Date.parse(`${currentMonth}/01/${currentYear}`);
    let day: Date = new Date(date);
    this.firstMonthDay = new Date(date);

    // Get the last day of the month and its date
    const lastDayOfMonth: Date = new Date(currentYear, currentMonth, 0);
    const lastDayOfMonthDate: number = lastDayOfMonth.getDate();
    this.lastMonthDay = lastDayOfMonth;

    // Get the index of the first day of the month
    let firstDayIndex: number = this.firstMonthDay.getDay() - 1;
    if (firstDayIndex === -1) {
      firstDayIndex = 6;
    }

    // Empty the day map so it only has the selected month
    this.daysMap = new Map();

    // Add empty arrays for the days before the first day of the month
    for (let index = 0; index < firstDayIndex; index++) {
      this.daysMap.set(`${index}`, []);
    }

    // Add Date string keys for each day in the month to the daysMap property with empty array values
    for (let index = 0; index < lastDayOfMonthDate; index++) {
      this.daysMap.set(day.toDateString(), []);
      day = new Date(day);
      day.setDate(day.getDate() + 1);
    }
  }

  /**
  * Loops through the component's tasks array and for each task:
  * Extracts the year, month, and day from the task date string and creates a Date object.
  * If the task date falls within the current month (between firstMonthDay and lastMonthDay inclusive),
  * adds the task to the corresponding day's task array in the component's daysMap.
  */
  populateDayMap(): void {
    this.tasks.forEach(task => {
      // Extract year, month, and day from task date string
      const dateParts: string[] = task.taskDate.toString().split("-");
      const year: number = Number(dateParts[0]);
      const month: number = Number(dateParts[1]);
      const day: number = Number(dateParts[2]);
      const taskDate: Date = new Date(`${month}/${day}/${year}`);

      // Add task to the corresponding day's task array in the daysMap
      if (taskDate >= this.firstMonthDay && taskDate <= this.lastMonthDay) {
        const dateString: string = taskDate.toDateString();
        const taskArray: Task[] = this.daysMap.get(dateString)!;
        taskArray.push(task);
      }
    });

    // console.log(this.daysMap); //TODO: DELETE
  }

  /**
  * Orders the map in ascending values
  */
  mapOrder(a: any, b: any): number {
    return 1;
  }

  /**
  * Opens a modal box displaying tasks for a given date
  */
  showTasks(date: string, tasks: Task[]): void {
    // Open a modal
    const modalRef = this.modalService.open(TaskBoxComponent);

    // Pass the necessary inputs to the modal component
    modalRef.componentInstance.dayDate = date;
    modalRef.componentInstance.dayTasks = tasks;
    modalRef.componentInstance.daysMap = this.daysMap;

    // Bind the parent component's methods to the modal component's inputs to allow for month change
    modalRef.componentInstance.monthChangePrev = this.moveToPreviousMonth.bind(this);
    modalRef.componentInstance.monthChangeNext = this.moveToNextMonth.bind(this);
    modalRef.componentInstance.dayMapUpdate = this.updateDayMap.bind(this);
  }

  updateDayMap(): Map<string, Task[]> {
    return this.daysMap;
  }

  /**
  * Function to move to the previous year and create a new calendar with the updated date
  */
  moveToPreviousYear(): void {
    // subtract 1 from the current year
    this.currentDate.setFullYear(this.currentDate.getFullYear() - 1);

    // update the today property to reflect the new date
    this.today = this.currentDate.toDateString();

    // create a new calendar with the updated date
    this.createCalendar(this.currentDate);

    // populate the day map with tasks
    this.populateDayMap();
  }

  /**
  * Function to move to the next year and create a new calendar with the updated date
  */
  moveToNextYear(): void {
    // add 1 to the current year
    this.currentDate.setFullYear(this.currentDate.getFullYear() + 1);

    // update the today property to reflect the new date
    this.today = this.currentDate.toDateString();

    // create a new calendar with the updated date
    this.createCalendar(this.currentDate);

    // populate the day map with tasks
    this.populateDayMap();
  }

  /**
    * Function to move to the previous month and create a new calendar with the updated date
    */
  moveToPreviousMonth(): void {
    // subtract 1 from the current month
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);

    // update the today property to reflect the new date
    this.today = this.currentDate.toDateString();

    // create a new calendar with the updated date
    this.createCalendar(this.currentDate);

    // populate the day map with tasks
    this.populateDayMap();
  }

  /**
  * Function to move to the next month and create a new calendar with the updated date
  */
  moveToNextMonth(): void {
    // add 1 to the current month
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);

    // update the today property to reflect the new date
    this.today = this.currentDate.toDateString();

    // create a new calendar with the updated date
    this.createCalendar(this.currentDate);

    // populate the day map with tasks
    this.populateDayMap();
  }


  onChildEvent() {
    console.log('Received data from child:');
  }
}
