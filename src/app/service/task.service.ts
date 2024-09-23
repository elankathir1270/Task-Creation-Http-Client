import { HttpClient, HttpErrorResponse, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Task } from '../model/task';
import { exhaustMap, map, Subject, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  errorSubject = new Subject<HttpErrorResponse>();
  authService : AuthService = inject(AuthService);

  constructor(private http : HttpClient) { }

  createTask(task : Task) {
    //setting headers to the request
    const headers = new HttpHeaders({'my-header' : 'hello world'});
    this.http.post<{name : string}>('https://task-management-4c6f3-default-rtdb.firebaseio.com/tasks.json',
      task, {headers : headers}).subscribe({
        error : (err) => this.errorSubject.next(err)
      })
  }

  updateTask(id : string, task : Task) {
    return this.http.put(`https://task-management-4c6f3-default-rtdb.firebaseio.com/tasks/${id}.json`,
      task
    )
  }

  getAllTasks() {

    return this.authService.user.pipe(take(1),exhaustMap((user) => {
      return this.http.get<{[key : string] : Task }>('https://task-management-4c6f3-default-rtdb.firebaseio.com/tasks.json',
        {params : new HttpParams().set('auth',user.token)}
      )
      .pipe(map((res) => {
        const tasks : Task[] = [];

        for(let key in res) {
          tasks.push({...res[key], id: key})
        }

        //console.log(tasks);
        return tasks

      }))

    }))



    //setting headers to get request
    // let headers = new HttpHeaders();
    // headers = headers.set('content-type', 'application/json')
    // headers = headers.set('content-type', 'text/html')
    // headers = headers.set('allow-edit','*')
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
    // let queryParams = new HttpParams();
    // queryParams = queryParams.set('page',1)
    // queryParams = queryParams.set('item',10)

    // return this.http.get<{[key : string] : Task }>('https://task-management-4c6f3-default-rtdb.firebaseio.com/tasks.json',
    //   {headers : headers, params : queryParams})
    // .pipe(map((res) => {
    //   const tasks : Task[] = [];

    //   for(let key in res) {
    //     tasks.push({...res[key], id: key})
    //   }

    //   //console.log(tasks);
    //   return tasks

    // }))
  }

  deleteTask(id: string) {
    this.http.delete(`https://task-management-4c6f3-default-rtdb.firebaseio.com/tasks/${id}.json`,
      //setting observe type and response type
      {observe : 'events', responseType : 'json'} // {observe : 'body', responseType : 'text'}
    ).pipe(tap((event) => {
      console.log(event.type);
      if(event.type === HttpEventType.Sent){
        //logic to update UI
      }
    }))
    .subscribe({
      error : (err) => this.errorSubject.next(err)
    });
  }

  deleteAllTasks() {
    this.http.delete(`https://task-management-4c6f3-default-rtdb.firebaseio.com/tasks.json`).subscribe({
      error : (err) => this.errorSubject.next(err)
    })
  }
}
