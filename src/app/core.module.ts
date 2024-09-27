import { NgModule } from "@angular/core";
import { LoginInterceptor } from "./service/login-interceptor.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "./service/auth-interceptor.service";

@NgModule({
  providers : [
      //{provide : HTTP_INTERCEPTORS, useClass : AuthInterceptor, multi : true},
      {provide : HTTP_INTERCEPTORS, useClass : LoginInterceptor,multi : true}
  ]
})
export class CoreModule {}
