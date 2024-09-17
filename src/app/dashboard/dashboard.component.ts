import { Component } from '@angular/core';
import { TaskService } from '../service/task.service';
import { Task } from '../model/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  AllTasks : Task[]
  selectedTask : Task
  showTaskDetails : boolean = false;
  showCreateTask : boolean = false;
  editMode : boolean = false;

  constructor(private taskService : TaskService) {}


  fetchTask() {
    this.taskService.getAllTasks().subscribe((tasks) => {
      this.AllTasks = tasks;
    })
  }

  fetchTaskClicked() {
    this.fetchTask();
  }

  createOrUpdateDetails(task : Task) {

    if(!this.editMode) {
      this.taskService.createTask(task)
    }
    else{
      this.taskService.updateTask(task)
    }
    this.fetchTask()
  }

  createTask() {
    this.showCreateTask = true;
  }

  clearTask() {}


  showDetails(id: string) {
    this.showTaskDetails = true
    this.selectedTask = this.AllTasks.find((task) => task.id === id)
    //console.log(this.selectedTask);

  }

  editDetails(id: string) {
    this.editMode = true
    this.showCreateTask = true

    this.selectedTask = this.AllTasks.find((task) => task.id === id);

  }

  deleteDetails(id: string) {

  }

  closeChildView() {
    this.showTaskDetails = false
    this.showCreateTask = false
  }

}
