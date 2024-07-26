import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {

  onFormSubmit(data : NgForm) {

    console.log(data.value);


  }

  OnCloseForm() {}

}
