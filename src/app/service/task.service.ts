import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
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
    //setting headers to get request
    let headers = new HttpHeaders();
    headers = headers.set('content-type', 'application/json')
    headers = headers.set('content-type', 'text/html')
    headers = headers.set('allow-edit','*')
    /*
    headers = headers.append('content-type', 'application/json')
    headers = headers.append('content-type', 'text/html')
    headers = headers.append('allow-edit','*')
    */
   /*
   Note : when we use set method if key value is same it will replace existing value to new one
   whereas in append method it will append the value with existing one
   */
    //setting queryParam
    let queryParams = new HttpParams();
    queryParams = queryParams.set('page',1)
    queryParams = queryParams.set('item',10)

    return this.http.get<{[key : string] : Task }>('https://angularhttpclient-6d23d-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json',
      {headers : headers, params : queryParams})
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
