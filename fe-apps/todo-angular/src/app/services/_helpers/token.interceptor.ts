import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  
  constructor(private authSrvc: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loggedUser = this.authSrvc.getLoggedUser();
    if (loggedUser) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${loggedUser.token}`
        }
      });
    }
    return next.handle(request);
  }

}
