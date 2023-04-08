import { Component, HostListener, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from 'src/app/entities/task';
import { TaskDetailsComponent } from '../task-details/task-details.component';

@Component({
  selector: 'app-task-box',
  templateUrl: './task-box.component.html',
  styleUrls: ['./task-box.component.scss']
})

/** 
Component for displaying a single day's tasks and details
*/
export class TaskBoxComponent implements OnInit {
  // Input for the day's date
  @Input() dayDate: string = "";

  // Input for an array that holds tasks for the current day
  @Input() dayTasks: Task[] = [];

  // Input for a map of tasks for all days
  @Input() daysMap!: Map<string, Task[]>;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    // console.log(this.dayDate);// TODO: Delete
    // console.log(this.dayTasks);// TODO: Delete
  }

  //TODO: Can't get tasks beyond current month


  /**
  Function that opens a modal to display details of a single task
  */
  openDetails(task: Task): void {
    const modalRef = this.modalService.open(TaskDetailsComponent);
    modalRef.componentInstance.task = task;
  }

  /**
  Function to move to the previous day
  */
  moveToPreviousDay(): void {
    const previousDay: Date = new Date(this.dayDate);
    previousDay.setDate(previousDay.getDate() - 1);
    // console.log(previousDay);// TODO: Delete

    // Update the day's date and tasks array with the previous day's data
    this.dayDate = previousDay.toDateString();
    this.dayTasks = this.daysMap.get(this.dayDate)!;
  }

  /**
  Function to move to the next day 
  */
  moveToNextDay(): void {
    const nextDay: Date = new Date(this.dayDate);
    nextDay.setDate(nextDay.getDate() + 1);
    // console.log(nextDay); // TODO: Delete

    // Update the day's date and tasks array with the next day's data
    this.dayDate = nextDay.toDateString();
    this.dayTasks = this.daysMap.get(this.dayDate)!;
  }

  /**
  Listens to left and right arrow keyboard events and triggers previous and next day move functions
  */
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      // If the left arrow key is pressed, move to the previous day
      this.moveToPreviousDay();
    } else if (event.key === 'ArrowRight') {
      // If the right arrow key is pressed, move to the next day
      this.moveToNextDay();
    }
  }
}