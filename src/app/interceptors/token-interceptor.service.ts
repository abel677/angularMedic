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
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const reqClone = req.clone({ headers });

    this.loader.show();
    return next.handle(reqClone).pipe(
      catchError((err) => {
        if (err.status === 500) {
          this.alert.Show();
          this.alert.setMessage('No hay conexión con el servidor');
          this.alert.setColor('text-bg-danger');  
        }
        if ([401, 403, 404].indexOf(err.status) !== -1) {
          this.alert.Show();
          this.alert.setMessage(err.error.message);
          this.alert.setColor('text-bg-danger');
          this.router.navigateByUrl('/login');
        }

        return throwError(() => new Error(err.error.message));
      }),
      finalize(() => {
        this.loader.close();
      })
    );
  }
}
