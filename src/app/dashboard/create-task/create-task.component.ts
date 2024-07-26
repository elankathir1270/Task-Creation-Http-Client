import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {

  constructor(private taskService : TaskService) {}

  onFormSubmit(data : NgForm) {

    this.taskService.createTask(data.value).subscribe((res) => {
      console.log(res);

    })
  }

  OnCloseForm() {}

}
