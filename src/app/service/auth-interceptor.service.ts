import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";


export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Interceptor class called");
    // modify the request and response
    const modifiedReq = req.clone({headers : req.headers.append('auth', 'srk')});
    return next.handle(modifiedReq).pipe(tap((event) => {

      if(event.type === HttpEventType.Response){
        console.log(event.body);

      }
    }));

      //to restrict for particular call
      // if(req.url !== ''){
      //   return next.handle(req);
      // }



  }

}
