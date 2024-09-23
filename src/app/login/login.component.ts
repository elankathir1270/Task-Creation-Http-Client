import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { AuthResponse } from '../model/AuthResponse';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isLoginMode : boolean = true;
  email: string = '';
  password: string = '';
  authService : AuthService = inject(AuthService);
  isLoading : boolean = false;
  errorMsg : string | null = null;
  authObs : Observable<AuthResponse>
  router  : Router = inject(Router);

  onSubmit(form : NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    if(this.isLoginMode) {
      this.isLoading = true;
      this.authObs = this.authService.login(email,password)
    }
    else{
      this.isLoading = true;
      this.authObs = this.authService.signup(email,password)
    }

    this.authObs.subscribe({
      next : (res) => {
        console.log(res)
        this.isLoading = false
        this.router.navigate(['/dashboard']);
      },
      error : (errorMsg) => {
        this.isLoading = false;
        this.errorMsg = errorMsg;
        this.hideErrorIndicator();
      }
    })
    form.reset();
  }

  toggleRegister() {
    this.isLoginMode = !this.isLoginMode
  }

  hideErrorIndicator() {
    setTimeout(()=> {
      this.errorMsg = null
    },3000)
  }

}
