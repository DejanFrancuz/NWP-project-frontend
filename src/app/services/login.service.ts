import { Injectable } from '@angular/core';
import {loginEnvironment} from "../../environments/login.environment";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, Subscription, tap, throwError} from "rxjs";
import {LoginRequest, LoginResponse, User} from "../model";
import {UserService} from "./user.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly apiUrl = loginEnvironment.postApi;

  public username: string = '';

  constructor(private httpClient: HttpClient) { }

  login(req: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}`, req);
  }


}
