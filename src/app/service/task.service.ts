import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../model/task';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http : HttpClient) { }

  createTask(task : Task) {
    return this.http.post<{name : string}>('https://angularhttpclient-6d23d-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json',
      task)
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
}
