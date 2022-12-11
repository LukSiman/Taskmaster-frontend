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

  //current task
  currentTask: Task | any = null;

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
    }, 1000);

    let month: string = (this.date.getMonth() + 1).toString().padStart(2, "0");
    let day: string = this.date.getDate().toString().padStart(2, "0");
    this.today = `${this.date.getFullYear()}-${month}-${day}`;

    //send date to service for today's tasks
    // this.taskService.getTasksByDate(this.today).subscribe(response => {
    //   this.tasks = response;
    //   console.log(this.tasks);//TODO: DELETE
    // });

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
    this.tasks.forEach(task => {
      //there are no set times skip the task
      if (task.taskStartTime == null || task.taskEndTime == null) {
        return;
      }

      //get start time of the task
      let startTime = new Date();
      startTime.setHours(task.taskStartTime.toString().split(",").map(Number)[0]);
      startTime.setMinutes(task.taskStartTime.toString().split(",").map(Number)[1]);
      startTime.setSeconds(0);

      //get ebd tune if the task
      let endTime = new Date();
      endTime.setHours(task.taskEndTime.toString().split(",").map(Number)[0]);
      endTime.setMinutes(task.taskEndTime.toString().split(",").map(Number)[1]);
      endTime.setSeconds(0);

      //set current task if it aligns with current time
      if (startTime < this.date && endTime > this.date) {
        this.currentTask = task;
        return task;
      }
      return;
    });
  }
}