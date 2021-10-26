import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AccountService} from "../_services/account.service";
import {take} from "rxjs/operators";
import {User} from "../_models/user";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  // @ts-ignore
  constructor(private accountService: AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUser: User;
    this.accountService.currentUser$.pipe(take(1)).subscribe(u => currentUser = u);

    // @ts-ignore
    if(currentUser){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }
    return next.handle(request);


  }
}

export const JwtHttpInterceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor,
  multi: true
}
