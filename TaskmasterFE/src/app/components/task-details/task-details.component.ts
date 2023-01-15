import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/entities/task';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {

  //task whose details to show
  @Input()
  task: Task = new Task;

  constructor() { }

  ngOnInit(): void {
  }

}
