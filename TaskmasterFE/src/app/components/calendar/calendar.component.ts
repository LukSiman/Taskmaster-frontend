import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from '../../entities/task';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  tasks: Task[] = [];
  daysMap: Map<string, Task[]> = new Map();

  firstMonthDay: Date = new Date();
  lastMonthDay: Date = new Date();

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.start();
  }

  async start(): Promise<void> {
    this.createThisMonthCalendar();
    await this.getAllTasks();
    this.populateDayMap();;
  }

  //gets all tasks from server
  async getAllTasks(): Promise<void> {
    await lastValueFrom(this.taskService.getTasks()).then(
      response => {
        this.tasks = response;
        console.log(this.tasks);//TODO: DELETE
      });

    return new Promise<void>(resolve => {
      resolve();
    });
  }

  //populates the Map for days of the current month
  //TODO: month and year according to selected year and month
  createThisMonthCalendar(): void {
    let currentDate: Date = new Date();
    let currentYear: number = currentDate.getFullYear();
    let currentMonth: number = currentDate.getMonth() + 1;
    let date: number = Date.parse(`${currentMonth}/01/${currentYear}`);
    let day: Date = new Date(date);
    this.firstMonthDay = new Date(date);
    let lastDay: number = new Date(currentYear, currentMonth, 0).getDate();
    this.lastMonthDay = new Date(currentYear, currentMonth, 0);

    for (let index = 0; index < lastDay; index++) {
      this.daysMap.set(day.toDateString(), []);
      day = new Date(day);
      day.setDate(day.getDate() + 1)
    }
  }

  //populate days map with tasks for the appropriate day
  populateDayMap(): void {
    this.tasks.forEach(task => {
      //getting date in correct format
      let date: string[] = task.taskDate.toString().split("-");
      let year: number = Number(date[0]);
      let month: number = Number(date[1]);
      let day: number = Number(date[2]);
      let taskDate: Date = new Date(`${month}/${day}/${year}`);

      //adding the task to the correct day 
      if (taskDate >= this.firstMonthDay && taskDate <= this.lastMonthDay) {
        let dateString = taskDate.toDateString();
        let taskArray: Task[] = this.daysMap.get(dateString)!;
        taskArray.push(task);
      }
    });

    console.log(this.daysMap);//TODO: DELETE
  }

  //orders the map in ascending values
  mapOrder(a: any, b: any) {
    return 1;
 }
}
