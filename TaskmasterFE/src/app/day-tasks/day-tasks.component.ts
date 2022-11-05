import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private taskService: TaskService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {
      this.displayCurrentDayTasks();
    });
  }

  //displays all task objects
  displayTasks(): void {
    this.taskService.getTasks().subscribe(response => {
      this.tasks = response;
      console.log(this.tasks);//TODO: DELETE
    });
  }

  //displays tasks for the current day
  displayCurrentDayTasks(): void {
    //update date each second
    setInterval(() => {
      this.date = new Date;
    }, 1000);

    let month: string = (this.date.getMonth() + 1).toString().padStart(2, "0");
    let day: string = this.date.getDate().toString().padStart(2, "0");
    this.today = `${this.date.getFullYear()}-${month}-${day}`;

    //send date to service for today's tasks
    this.taskService.getTasksByDate(this.today).subscribe(response => {
      this.tasks = response;
      console.log(this.tasks);//TODO: DELETE
    });
  }
}