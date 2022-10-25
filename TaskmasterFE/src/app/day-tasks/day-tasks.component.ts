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

  constructor(private taskService: TaskService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {
      this.displayTasks();
    });
  }

  //displays all task objects
  displayTasks(): void {
    this.taskService.getTasks().subscribe(response => {
      this.tasks = response;
      console.log(this.tasks);
    });    
  }
}