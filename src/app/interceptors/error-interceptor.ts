import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          if(request.url.includes("machines/all")){
            this.snackBar.open('Nemate dozvolu za čitanje masina.', 'Zatvori', {
              duration: 5000,
            });
          }
          else if(request.url.includes("users/all")){
            console.log('Nemate dozvolu za citanje korisnika.');
          }
          else if(request.url.includes("machines/update")){
            console.log('Nemate dozvolu za azuriranje masina.');
          }
          else if(request.url.includes("mashines/delete")){
            console.log('Nemate dozvolu za brisanje masina.');
          }
          else if(request.url.includes("mashines/add")){
            console.log('Nemate dozvolu za dodavanje masina.');
          }
          else if(request.url.includes("users/update")){
            console.log('Nemate dozvolu za azuriranje korisnika.');
          }
          else if(request.url.includes("users/delete")){
            console.log('Nemate dozvolu za brisanje korisnika.');
          }
          return throwError(error);
        }
        return throwError(error);
      })
    );
  }
}
