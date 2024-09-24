import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { exhaustMap, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";


export class LoginInterceptor implements HttpInterceptor {

  authService : AuthService = inject(AuthService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      return this.authService.user.pipe(take(1),exhaustMap((user) => {

        if(!user) {
          return next.handle(req);
        }

        const modifiedReq = req.clone({params : new HttpParams().set('auth', user.token)})
        return next.handle(modifiedReq);
      }))

      // console.log("Login interceptor called");

      // const modifiedReq = req.clone({headers : req.headers.append('loginToken', 'abc')});
      // return next.handle(modifiedReq);

  }
}
