import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { getLocalStorage } from '../helpers';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor  implements HttpInterceptor {
  toastr: any;
  constructor(
    // public dialog: MatDialog
    ) { }

  // Intercepts all HTTP requests!
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = getLocalStorage('token');
    if (!!token) {
      request = request.clone({
        setHeaders: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${token}`,
          'cache-control': 'no-cache',
        }
      });
      console.log('\n================request ===================\n');
      console.log(request);
      console.log('\n================request ===================\n');
    }
    return next.handle(request);
  }

}
