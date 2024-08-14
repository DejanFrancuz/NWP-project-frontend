import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {loginEnvironment, userEnvironment} from "../../environments/login.environment";
import { LoginRequest, User} from "../model";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl = userEnvironment.postApi;

  private authorities: String[] = [];

  constructor(private httpClient: HttpClient) { }

  getUsers (): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}\\all`);
  }
  addUser(user: User): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}\\add`,user).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
  getUserById (id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}\\getone`, { params: { id: id } });
  }

  getUserByEmail (email: string): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}\\get-user-by-email`, { params: { email: email } });
  }


  updateUser(user: User): Observable<any> {
    console.log(user);
    return this.httpClient.put<any>(`${this.apiUrl}/update`, user).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiUrl}/delete`, { params: { id: id}});
  }

  setAuthorities(authorities: String[]) {
    this.authorities = authorities;
  }

  getAuthorities(): String[] {
    return this.authorities;
  }
}
