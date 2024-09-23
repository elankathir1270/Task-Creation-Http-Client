import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthResponse } from '../model/AuthResponse';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http : HttpClient = inject(HttpClient);
  user : BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor() { }

  signup(email : string, password : string){
    const data = {email : email, password : password, returnSecureToken : true}
    return this,this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDFvwShdap0cEW-c26CXP1mxMFtTG9Vfxg`,data)
    .pipe(catchError(this.handleError),tap((res) => {
      this.handleCreateUser(res);
    }));
  }

  login(email : string, password : string){
    const data = {email : email, password : password, returnSecureToken : true}
    return this,this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDFvwShdap0cEW-c26CXP1mxMFtTG9Vfxg`,data)
    .pipe(catchError(this.handleError),tap((res) => {
      this.handleCreateUser(res);
    }));
  }

  handleCreateUser(userRes : AuthResponse){
    const expiresInTs = new Date().getTime() + +userRes.expiresIn;
    const expiresIn = new Date(expiresInTs);
    const user = new User(userRes.email,userRes.localId,userRes.idToken,expiresIn);
    this.user.next(user);
  }

  handleError(err) {
    let errorMessage = "An unknown error has occurred"
      if(!err.error || !err.error.error.message){
        return throwError(() => errorMessage);
      }

      switch(err.error.error.message){
        case 'EMAIL_EXISTS' : errorMessage = "This email already exist"
        break;
        case 'INVALID_LOGIN_CREDENTIALS' : errorMessage = "Email or password not correct"
        break;
        default : errorMessage = "An unknown error has occurred"
      }
      return throwError(() => errorMessage);
  }
}
