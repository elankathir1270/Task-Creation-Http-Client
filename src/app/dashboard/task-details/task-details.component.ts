import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/model/task';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {

  @Input() taskDetails : Task;
  @Output() closeDetails : EventEmitter<boolean> = new EventEmitter<boolean>();

  OnCloseDetails() {
    this.closeDetails.emit(false);
  }

}
