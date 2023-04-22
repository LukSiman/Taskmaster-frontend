import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from 'src/app/entities/task';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { TaskService } from 'src/app/services/task.service';
import { CreateTaskBoxComponent } from '../create-task-box/create-task-box.component';

@Component({
  selector: 'app-task-box',
  templateUrl: './task-box.component.html',
  styleUrls: ['./task-box.component.scss']
})


//TODO: Add task
//TODO: Modify task

/** 
* Component for displaying a single day's tasks and details
*/
export class TaskBoxComponent implements OnInit {
  // Input for the day's date
  @Input() dayDate: string = "";

  // Input for an array that holds tasks for the current day
  @Input() dayTasks: Task[] = [];

  // Input for a map of tasks for all days
  @Input() daysMap!: Map<string, Task[]>;

  // Input for a call back function to change month to the previous 
  @Input() monthChangePrev!: () => void;

  // Input for a call back function to change month to the next 
  @Input() monthChangeNext!: () => void;

  // Input for a call back function to update the daysMap
  @Input() dayMapUpdate!: () => void;

  // Output for item deletion event
  @Output() itemDeleted = new EventEmitter<boolean>();

  constructor(private modalService: NgbModal, private taskService: TaskService) { }

  ngOnInit(): void {
  }

  /**
  * Function that opens a modal to display details of a single task
  */
  openDetails(task: Task): void {
    const modalRef = this.modalService.open(TaskDetailsComponent);
    modalRef.componentInstance.task = task;
  }

  /**
  * Function to move to the previous day
  */
  moveToPreviousDay(): void {
    const previousDay: Date = new Date(this.dayDate);
    previousDay.setDate(previousDay.getDate() - 1);

    // check for month change and change it to the previous one
    if (previousDay.getMonth() != new Date(this.dayDate).getMonth()) {
      this.monthChangePrev();
      this.daysMap = this.dayMapUpdate()!;
    }

    // Update the day's date and tasks array with the previous day's data
    this.dayDate = previousDay.toDateString();
    this.dayTasks = this.daysMap.get(this.dayDate)!;
  }

  /**
  * Function to move to the next day 
  */
  moveToNextDay(): void {
    const nextDay: Date = new Date(this.dayDate);
    nextDay.setDate(nextDay.getDate() + 1);

    // check for month change and change it to the next one
    if (nextDay.getMonth() != new Date(this.dayDate).getMonth()) {
      this.monthChangeNext();
      this.daysMap = this.dayMapUpdate()!;
    }

    // Update the day's date and tasks array with the next day's data
    this.dayDate = nextDay.toDateString();
    this.dayTasks = this.daysMap.get(this.dayDate)!;
  }

  /**
  * Listens to left and right arrow keyboard events and triggers previous and next day move functions
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

  /**
  * Function to delete a task from the backend
  */
  deleteTask(uuid: string): void {
    // Delete the task using the taskService and update the daysMap and dayTasks after success
    this.taskService.deleteTask(uuid).subscribe(() => {
      // Emit an event to notify the parent component about the item deletion
      this.itemDeleted.emit(true);

      // Update the daysMap after deletion
      this.daysMap = this.dayMapUpdate()!;

      // Update the dayTasks for the current dayDate after deletion
      this.dayTasks = this.daysMap.get(this.dayDate)!;
    });
  }

  /**
  * Function that opens a new modal for adding new tasks
  */
  openAddTaskBox() {
    this.modalService.open(CreateTaskBoxComponent);
  }
}