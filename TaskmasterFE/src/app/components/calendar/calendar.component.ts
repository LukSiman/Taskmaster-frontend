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
  days: any[] = [];


  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.start();
  }

  async start(): Promise<void> {
    await this.getAllTasks();
    this.createThisMonthCalendar();
    // this.groupTasksToDays();
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

  //creates an array for days of the current month
  //TODO: month and year according to selected year and month
  createThisMonthCalendar(): void {
    let currentDate: Date = new Date();
    let currentYear: number = currentDate.getFullYear();
    let currentMonth: number = currentDate.getMonth() + 1;
    let date: number = Date.parse(`${currentMonth}/01/${currentYear}`);
    let day: Date = new Date(date);
    let lastDay: number = new Date(currentYear, currentMonth, 0).getDate();

    for (let index = 0; index < lastDay; index++) {
      this.days.push(day);
      day = new Date(day);
      day.setDate(day.getDate() + 1)
    }

    console.log(this.days);
  }

  //groups tasks into separate days
  groupTasksToDays(): void {
    this.tasks.forEach(task => {
      if (!this.days.includes(task.taskDate)) {
        let day = new Map();


        // this.days.push(task.taskDate);
      }
    });

    console.log(this.days);
  }
}
