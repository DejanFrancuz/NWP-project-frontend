import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {JWT_OPTIONS, JwtHelperService, JwtModule} from '@auth0/angular-jwt';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      });

      return next.handle(clonedRequest);
    }


    this.router.navigate(['/login']);
    return next.handle(request);
  }

}
