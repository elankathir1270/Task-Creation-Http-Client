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

  constructor(private taskService : TaskService) {}


  fetchTask() {
    this.taskService.getAllTasks().subscribe((tasks) => {
      this.AllTasks = tasks;
    })
  }

  fetchTaskClicked() {
    this.fetchTask();
  }

  createTask() {}

  clearTask() {}


  showDetails(id: string) {
    this.showTaskDetails = true
    this.selectedTask = this.AllTasks.find((task) => task.id === id)
    //console.log(this.selectedTask);

  }

  editDetails(id: string) {

  }

  deleteDetails(id: string) {

  }

  closeDetailView() {
    this.showTaskDetails = false
  }

}
