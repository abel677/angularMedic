import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { Observable, catchError, finalize, map, throwError } from 'rxjs';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    private alert: AlertService,
    private router: Router,
    private loader: LoaderService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loader.show();

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const reqClone = req.clone({ headers });

    return next.handle(reqClone)
    .pipe(
      map(res => {
        console.log(res);
        
        return res
     }),
      catchError((err) => {
        this.alert.Show();
        this.alert.setMessage(err.error.message);
        this.alert.setColor('text-bg-danger');
        if ([401, 403, 404].indexOf(err.status) !== -1) {
          this.router.navigateByUrl('/login');
        }
        return throwError(() => new Error(err));
      }),
      finalize(() => {
        this.loader.close();
      })
    );
  }
}
