import { Component, inject } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'http-client-wrks';
  authService = inject(AuthService);

  ngOnInit(){
    this.authService.autoLogin();
  }
}
