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
  currentTask: Task = new Task;

  constructor(private taskService: TaskService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // this.activatedRoute.paramMap.subscribe(() => {
    //   this.displayCurrentDayTasks();
    // });

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
  findCurrentTask() {
    console.log("Test");

    this.tasks.forEach(task => {
      console.log(`Start time: ${task.taskStartTime}`);
      console.log(`End time: ${task.taskStartTime}`);
      console.log(`Current time: ${this.date.getTime()}`);
    });
  }
}