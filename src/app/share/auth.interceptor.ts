import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { switchMap, take, catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  authService: any;
  constructor(private afAuth: AngularFireAuth) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.afAuth.idToken.pipe(
      take(1),
      switchMap((idToken) => {
        if (idToken) {
          request = this.addAuthorizationHeader(request, idToken);
        }
        return next.handle(request).pipe(
          catchError((error) => {
            // Check if the error is due to an expired token
            if (error.status === 401 && error.error?.message === 'TOKEN_EXPIRED') {
              return this.refreshTokenAndRetry(request, next);
            }
            // If it's not an expired token error, propagate the error
            throw error;
          })
        );
      })
    );
  }

  private addAuthorizationHeader(
    request: HttpRequest<any>,
    idToken: string
  ): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${idToken}`,
      },
    });
  }

  private refreshTokenAndRetry(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    return this.authService.refreshToken().pipe(
      switchMap((newToken:string) => {
        if (newToken) {
          const updatedRequest = this.addAuthorizationHeader(request, newToken);
          return next.handle(updatedRequest);
        } else {
          // Handle token refresh failure (e.g., logout user)
          this.authService.logout();
          return EMPTY; // Return an empty observable or throw an error if needed
        }
      })
    );
  
   
  }
}