import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";


export class LoginInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log("Login interceptor called");

      const modifiedReq = req.clone({headers : req.headers.append('loginToken', 'abc')});
      return next.handle(modifiedReq);

  }
}
