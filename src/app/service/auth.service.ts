import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthResponse } from '../model/AuthResponse';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { User } from '../model/User';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http : HttpClient = inject(HttpClient);
  user : BehaviorSubject<User> = new BehaviorSubject<User>(null);
  router : Router = inject(Router);
  tokenExpireTimer : any;

  constructor() { }

  signup(email : string, password : string){
    const data = {email : email, password : password, returnSecureToken : true}
    return this,this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseApiKey}`,data)
    .pipe(catchError(this.handleError),tap((res) => {
      this.handleCreateUser(res);
    }));
  }

  login(email : string, password : string){
    const data = {email : email, password : password, returnSecureToken : true}
    return this,this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseApiKey}`,data)
    .pipe(catchError(this.handleError),tap((res) => {
      this.handleCreateUser(res);
    }));
  }

  autoLogin() {
    const user = JSON.parse(localStorage.getItem('user'));

    if(!user){
      return;
    }

    const loggedUser = new User(user.email,user.id,user._token,user._expiresIn);

    if(loggedUser.token){
      this.user.next(loggedUser);

      const timer = user._expiresIn.getTime() - new Date().getTime();
      this.autoLogout(timer);
    }

  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('user')
/*
Note : this below code is for clear the setTimeOut time while we do logout manually,
else the time continue to run after the logout, if do login again it may logout when the
setTimeOut time comes to end.
*/
    if(this.tokenExpireTimer){
      clearTimeout(this.tokenExpireTimer)
    }
    this.tokenExpireTimer = null;
  }

  autoLogout(expireTime : number){
    this.tokenExpireTimer = setTimeout(() =>{
      this.logout();
    },expireTime)
  }

  handleCreateUser(userRes : AuthResponse){
    const expiresInTs = new Date().getTime() + +userRes.expiresIn;
    const expiresIn = new Date(expiresInTs);
    const user = new User(userRes.email,userRes.localId,userRes.idToken,expiresIn);
    this.user.next(user);
    this.autoLogout(+userRes.expiresIn * 1000)
    localStorage.setItem('user', JSON.stringify(user));
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
