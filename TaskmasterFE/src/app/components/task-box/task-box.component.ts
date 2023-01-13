import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/entities/task';

@Component({
  selector: 'app-task-box',
  templateUrl: './task-box.component.html',
  styleUrls: ['./task-box.component.scss']
})
export class TaskBoxComponent implements OnInit {

  // the day's date
  @Input() dayDate: string = "";

  // array that holds tasks
  @Input() dayTasks: Task[] = [];


  constructor() { }

  ngOnInit(): void {
    console.log(this.dayDate);
    console.log(this.dayTasks);
  }

}
