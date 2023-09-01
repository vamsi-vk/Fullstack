// auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { switchMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private afAuth: AngularFireAuth) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.afAuth.idToken.pipe(
      take(1), // Take the current token and complete the observable
      switchMap((idToken) => {
        if (idToken) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${idToken}`,
            },
          });
        }
        return next.handle(request);
      })
    );
  }
}
