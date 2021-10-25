import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";
import {NavigationExtras, Router} from "@angular/router";

@Injectable()
export class ErrorInterceptorInterceptor implements HttpInterceptor {

  constructor(private toastrService: ToastrService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(httpResponseError => {
          this.handleError(httpResponseError);
        return throwError(httpResponseError);

      })
    );
  }

  private handleError(httpResponseError: any){
    if(httpResponseError){
      switch (httpResponseError.status){
        case 400:
          const errorObject = httpResponseError.error.errors;
          if(errorObject){
            const modelStateErrors = [];
            for (const key in errorObject){
              if(errorObject[key]){
                modelStateErrors.push(...errorObject[key]);
              }
            }
            throw modelStateErrors;
          }else{
            this.toastrService.error(httpResponseError.error, httpResponseError.status);
          }
          break;
        case 401:
          this.toastrService.error(httpResponseError.error, httpResponseError.status);
          break;
        case 404:
          this.router.navigateByUrl('/not-found').then();
          break;
        case 500:
          const navigationExtras: NavigationExtras = {state: { error: httpResponseError.error}}
          this.router.navigateByUrl('/server-error', navigationExtras).then();
          break;
        default:
          console.log(httpResponseError);
          this.toastrService.error("something unexpected happened");
      }
    }
  }
}

export const ErrorInterceptor  = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptorInterceptor,
  multi: true
}
