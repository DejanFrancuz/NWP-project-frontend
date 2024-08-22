import { Component } from '@angular/core';
import {LoginService} from "../services/login.service";
import {LoginRequest} from "../model";
import {Observable} from "rxjs";
import {JWT_OPTIONS, JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {UserService} from "../services/user.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = "";
  password: string = "";
  req: LoginRequest = { username: "", password: "" };

  constructor(private loginService: LoginService, private jwtHelper: JwtHelperService, private userService: UserService, private router: Router) {}

  onSubmit(){
    this.req = {
      username: this.email,
      password: this.password
    }
    this.loginService.login(this.req).subscribe({
      next: (response: any) => {
          localStorage.setItem('token', response.jwt);
          const authorities = this.extractAuthoritiesFromToken(response.jwt);
          if (authorities) {
            localStorage.setItem('authorities', JSON.stringify(authorities));
          }
          this.router.navigateByUrl('view');
      },
      error: (error) => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('authotities');
      }
    });

  }

  private extractAuthoritiesFromToken(token: string): string[] | null {

    const tokenParts = token.split('.');

    if (tokenParts.length !== 3) {
      return null;
    }

    const header = JSON.parse(atob(tokenParts[0]));
    const payload = JSON.parse(atob(tokenParts[1]));

    const authorities = payload && payload.authorities && Array.isArray(payload.authorities) ? payload.authorities : null;
    const username = payload && payload.sub ? payload.sub : null;


    if(username) localStorage.setItem('email', username);

    return authorities;
  }
}
