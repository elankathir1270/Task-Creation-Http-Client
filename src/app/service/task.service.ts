import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  errorSubject = new Subject<HttpErrorResponse>();

  constructor(private http : HttpClient) { }

  createTask(task : Task) {
    //setting headers to the request
    const headers = new HttpHeaders({'my-header' : 'hello world'});
    this.http.post<{name : string}>('https://angularhttpclient-6d23d-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json',
      task, {headers : headers}).subscribe({
        error : (err) => this.errorSubject.next(err)
      })
  }

  updateTask(id : string, task : Task) {
    return this.http.put(`https://angularhttpclient-6d23d-default-rtdb.asia-southeast1.firebasedatabase.app/tasks/${id}.json`,
      task
    )
  }

  getAllTasks() {
    return this.http.get<{[key : string] : Task }>('https://angularhttpclient-6d23d-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json')
    .pipe(map((res) => {
      const tasks : Task[] = [];

      for(let key in res) {
        tasks.push({...res[key], id: key})
      }

      //console.log(tasks);
      return tasks

    }))
  }

  deleteTask(id: string) {
    this.http.delete(`https://angularhttpclient-6d23d-default-rtdb.asia-southeast1.firebasedatabase.app/tasks/${id}.json`).subscribe({
      error : (err) => this.errorSubject.next(err)
    });
  }

  deleteAllTasks() {
    this.http.delete(`https://angularhttpclient-6d23d-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json`).subscribe({
      error : (err) => this.errorSubject.next(err)
    })
  }
}
