import { Component, inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  authService : AuthService = inject(AuthService);
  isLoggedIn : boolean = false;
  private userSubject : Subscription;

  ngOnInit(){
    this.userSubject = this.authService.user.subscribe((user) => {
      console.log(user);
      this.isLoggedIn = user ? true : false;
    })
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.userSubject.unsubscribe();
  }

}
