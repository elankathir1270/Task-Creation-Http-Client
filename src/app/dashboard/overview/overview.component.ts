import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  AllTasks : Task[]
  selectedTask : Task
  showTaskDetails : boolean = false;
  showCreateTask : boolean = false;
  editMode : boolean = false;
  isLoading : boolean = false;
  errorMsg : string | null;

  constructor(private taskService : TaskService) {}

  ngOnInit(): void {
      this.fetchTask();
      this.taskService.errorSubject.subscribe({
        next : (errorMsg) =>{
          this.setErrorMessage(errorMsg);
        }
      })
  }


  fetchTask() {
    this.isLoading = true
    this.taskService.getAllTasks().subscribe({
      next : (tasks) => {
        this.AllTasks = tasks;
        this.isLoading = false;
      },
      error : (error) => {
        this.setErrorMessage(error);
        this.isLoading = false;
      }

    })
  }

  fetchTaskClicked() {
    this.fetchTask();
  }

  createOrUpdateDetails(task : Task) {

    if(!this.editMode) {
      this.taskService.createTask(task);
    }
    else{
      this.taskService.updateTask(this.selectedTask.id,task).subscribe({
        next : () => {
          this.fetchTask();
        }
      })
    }
  }

  createTask() {
    this.showCreateTask = true;
    this.editMode = false;
  }

  clearTasks() {
    this.taskService.deleteAllTasks()
  }


  showDetails(task: Task) {
    this.showTaskDetails = true
    this.selectedTask = task
    //console.log(this.selectedTask);

  }

  editDetails(id: string) {
    this.editMode = true
    this.showCreateTask = true

    this.selectedTask = this.AllTasks.find((task) => task.id === id);

  }

  deleteDetails(id: string) {
    this.taskService.deleteTask(id)
  }

  closeChildView() {
    this.showTaskDetails = false
    this.showCreateTask = false
  }

  setErrorMessage(err : HttpErrorResponse) {
    //console.log(err);
    this.errorMsg = err.error.error
    setTimeout(() => {
      this.errorMsg = null;
    },3000)
  }


}
