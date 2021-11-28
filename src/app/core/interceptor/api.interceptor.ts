import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable()
export class ApiInteceptor implements HttpInterceptor {
  constructor( private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token: any = '';
    if (localStorage.getItem('dfo_auth_token') != null) {
      token = 'Bearer ' + localStorage.getItem('dfo_auth_token');
    } else {
      token = environment.publicToken
    }
   
      request = request.clone({
        headers: request.headers.set('authorization', token),
      });

   

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status == 403 || err.status == 401) {
          localStorage.removeItem('dfo_user_name');
          localStorage.removeItem('dfo_auth_token');
          localStorage.removeItem('dfo_user_type');
          // this.toastr.error(
          //   'Unauthorized user access found please login once again',
          //   'Unauthorized Access',
          //   {
          //     positionClass: 'toast-top-right',
          //   }
          // );
          this.router.navigate(['/login']);
        }
        return throwError(err);
      }),
      finalize(() => {})
    );
  }
}
