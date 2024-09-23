import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {

  @Input() isEditMode : boolean;
  @Input() taskToUpdate : Task;
  @Output() closeTaskForm : EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() formData : EventEmitter<Task> = new EventEmitter<Task>();
  @ViewChild('taskForm') taskForm : NgForm;

  constructor(private taskService : TaskService) {}

  ngAfterViewInit() {
    setTimeout(() => {
      if(this.isEditMode){
        this.taskForm.form.patchValue(this.taskToUpdate);
      }
    },0)
  }

  onFormSubmit(data : NgForm) {

    this.formData.emit(data.value);
    this.closeTaskForm.emit(false);
    this.taskForm.reset()
    // this.taskService.createTask(data.value).subscribe((res) => {
    //   console.log(res);
    // })
  }

  OnCloseForm() {
    this.closeTaskForm.emit(false);
  }

}
