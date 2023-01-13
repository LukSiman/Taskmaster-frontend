import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from 'src/app/entities/task';
import { TaskDetailsComponent } from '../task-details/task-details.component';

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


  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    console.log(this.dayDate);
    console.log(this.dayTasks);
  }

  openDetails(task: Task): void {
    const modalRef = this.modalService.open(TaskDetailsComponent);
    modalRef.componentInstance.task = task;
  }
}
