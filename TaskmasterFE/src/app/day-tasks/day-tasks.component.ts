import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import { Task } from '../entities/task';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-day-tasks',
  templateUrl: './day-tasks.component.html',
  styleUrls: ['./day-tasks.component.scss']
})
export class DayTasksComponent implements OnInit {
  //array to hold tasks
  tasks: Task[] = [];

  //date variables
  date: Date = new Date;
  today: string = "";

  //time variables
  totalTaskTime: string = "";
  elapsedTime: string = "";
  remainingTime: string = "";

  //task variables
  currentTask: Task | any = null;
  nextTask: Task | any = null;

  constructor(private taskService: TaskService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.start();
  }

  //starts the methods to get tasks
  async start() {
    await this.displayCurrentDayTasks()
    this.findCurrentTask();
  }

  //displays all task objects
  displayTasks(): void {
    this.taskService.getTasks().subscribe(response => {
      this.tasks = response;
      console.log(this.tasks);//TODO: DELETE
    });
  }

  //displays tasks for the current day
  async displayCurrentDayTasks(): Promise<void> {
    //update date each second
    setInterval(() => {
      this.date = new Date;

      if (this.currentTask != null) {
        let startTime: Date = this.getCorrectedDate(this.currentTask.taskStartTime);
        let endTime: Date = this.getCorrectedDate(this.currentTask.taskEndTime);

        this.elapsedTime = this.getTimeFormat(startTime, this.date);
        this.remainingTime = this.getTimeFormat(this.date, endTime);
      }

    }, 1000);

    let month: string = (this.date.getMonth() + 1).toString().padStart(2, "0");
    let day: string = this.date.getDate().toString().padStart(2, "0");
    this.today = `${this.date.getFullYear()}-${month}-${day}`;

    //send date to service for today's tasks
    await lastValueFrom(this.taskService.getTasksByDate(this.today)).then(
      response => {
        this.tasks = response;
        console.log(this.tasks);//TODO: DELETE
      });

    return new Promise<void>(resolve => {
      resolve();
    });
  }

  //find current task
  findCurrentTask(): void {
    let index = 0;
    this.tasks.forEach(task => {
      index++;

      //there are no set times skip the task
      if (task.taskStartTime == null || task.taskEndTime == null) {
        return;
      }

      //get start time of the task
      let startTime: Date = this.getCorrectedDate(task.taskStartTime);

      //get end time if the task
      let endTime: Date = this.getCorrectedDate(task.taskEndTime);

      //set current task if it aligns with current time
      if (startTime < this.date && endTime > this.date) {
        this.currentTask = task;
        this.totalTaskTime = this.getTimeFormat(startTime, endTime);

        return task;
      }
      return;
    });
  }

  // returns task time in correct format
  getCorrectedDate(time: Date): Date {
    let returnTime = new Date();
    returnTime.setHours(time.toString().split(",").map(Number)[0]);
    returnTime.setMinutes(time.toString().split(",").map(Number)[1]);
    returnTime.setSeconds(0);

    return returnTime;
  }

  // returns a string in the correct time format
  getTimeFormat(startTime: Date, endTime: Date): string {
    let differenceInSeconds: number = (endTime.getTime() - startTime.getTime()) / 1000;
    let seconds: number = differenceInSeconds % 60;
    let minutes: number = (differenceInSeconds / 60) % 60;
    let hours: number = Math.trunc((differenceInSeconds / 60 / 60) % 24);
    let formattedString = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    return formattedString;
  }

}