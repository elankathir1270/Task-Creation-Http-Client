import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateTaskComponent } from './dashboard/create-task/create-task.component';
import { TaskDetailsComponent } from './dashboard/task-details/task-details.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './service/auth-interceptor.service';
import { LoginInterceptor } from './service/login-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CreateTaskComponent,
    TaskDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass : AuthInterceptor, multi : true},
    {provide : HTTP_INTERCEPTORS, useClass : LoginInterceptor,multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
