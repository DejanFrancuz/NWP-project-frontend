import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { ViewComponent } from './view/view.component';
import { RegistrationComponent } from './registration/registration.component';
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import { UserEditComponent } from './user-edit/user-edit.component';
import {ErrorInterceptor} from "./interceptors/error-interceptor";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {JwtHelperService, JwtModule} from "@auth0/angular-jwt";
import { MachineViewComponent } from './machine-view/machine-view.component';
import { MachineRegistrationComponent } from './machine-registration/machine-registration.component';
import { MachineScheduleComponent } from './machine-view/machine-schedule/machine-schedule.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ViewComponent,
    RegistrationComponent,
    UserEditComponent,
    MachineViewComponent,
    MachineRegistrationComponent,
    MachineScheduleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        allowedDomains: ['*'],
      }
    })
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
