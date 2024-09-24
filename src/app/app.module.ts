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
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { LoaderComponent } from './utility/loader/loader.component';
import { ErrorIndicatorComponent } from './utility/error-indicator/error-indicator.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CreateTaskComponent,
    TaskDetailsComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    LoaderComponent,
    ErrorIndicatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    //{provide : HTTP_INTERCEPTORS, useClass : AuthInterceptor, multi : true},
    {provide : HTTP_INTERCEPTORS, useClass : LoginInterceptor,multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
