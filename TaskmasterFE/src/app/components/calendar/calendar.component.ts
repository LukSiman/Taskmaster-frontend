import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from '../../entities/task';
import { lastValueFrom } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskBoxComponent } from '../task-box/task-box.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  // An array to store tasks.
  tasks: Task[] = [];

  // A Map to store tasks for each day, with the key being the date string.
  daysMap: Map<string, Task[]> = new Map();

  // An array of days of the week, starting with Monday.
  daysOfTheWeek: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // A Date object representing the first day of the current month.
  firstMonthDay: Date = new Date();

  // A Date object representing the last day of the current month.
  lastMonthDay: Date = new Date();

  // A string representing today's date in the format "Day Month Date Year".
  today: string = "";


  constructor(private taskService: TaskService, private modalService: NgbModal) { }

  //TODO: Delete tasks
  //TODO: Add task
  //TODO: Modify task

  ngOnInit(): void {
    this.start();
  }

  /**
  Asynchronous method that initializes the calendar view by creating this month's calendar,
  retrieving all tasks, and populating the day map with the corresponding tasks.
  */
  async start(): Promise<void> {
    this.createThisMonthCalendar();
    await this.getAllTasks();
    this.populateDayMap();
  }

  /**
  Retrieves all tasks from the server and stores them in the 'tasks' array.
  @returns A Promise that resolves when the task data has been loaded and stored.
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
  Initializes the current month's calendar by setting the component's today, firstMonthDay, and lastMonthDay properties.
  Populates the daysMap property with empty arrays for the days before the first day of the month.
  Populates the daysMap property with a Date string key for each day in the month, with an empty array value for each.
  */
  createThisMonthCalendar(): void {
    // Get the current date and set today to current date as a string
    const currentDate = new Date();
    this.today = currentDate.toDateString();

    // Set current year and month
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    // Create a new Date object for the first day of the month
    const date = Date.parse(`${currentMonth}/01/${currentYear}`);
    let day = new Date(date);
    this.firstMonthDay = new Date(date);

    // Get the last day of the month and its date
    const lastDayOfMonth = new Date(currentYear, currentMonth, 0);
    const lastDayOfMonthDate = lastDayOfMonth.getDate();
    this.lastMonthDay = lastDayOfMonth;

    // Get the index of the first day of the month and add empty arrays for the days before the first day of the month
    let firstDayIndex = this.firstMonthDay.getDay() - 1;
    if (firstDayIndex === -1) {
      firstDayIndex = 6;
    }
    for (let index = 0; index < firstDayIndex; index++) {
      this.daysMap.set(`${index}`, []);
    }

    // Add Date string keys for each day in the month to the daysMap property with empty array values
    for (let index = 0; index < lastDayOfMonthDate; index++) {
      this.daysMap.set(day.toDateString(), []);
      day = new Date(day);
      day.setDate(day.getDate() + 1);
    }

    //TODO: month and year according to selected year and month
  }

  /**
  Loops through the component's tasks array and for each task:
  Extracts the year, month, and day from the task date string and creates a Date object.
  If the task date falls within the current month (between firstMonthDay and lastMonthDay inclusive),
  adds the task to the corresponding day's task array in the component's daysMap.
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
        const dateString = taskDate.toDateString();
        const taskArray: Task[] = this.daysMap.get(dateString)!;
        taskArray.push(task);
      }
    });

    console.log(this.daysMap); //TODO: DELETE
  }

  //orders the map in ascending values
  mapOrder(a: any, b: any): number {
    return 1;
  }

  /**
  Opens a modal box displaying tasks for a given date
  Sets the dayDate and dayTasks properties of the TaskBoxComponent instance in the modal
  */
  showTasks(date: string, tasks: Task[]): void {
    const modalRef = this.modalService.open(TaskBoxComponent);
    modalRef.componentInstance.dayDate = date;
    modalRef.componentInstance.dayTasks = tasks;
    modalRef.componentInstance.daysMap = this.daysMap;
    //TODO: References to previous and next tasks for could move between days
  }
}
