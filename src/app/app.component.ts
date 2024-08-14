import { Component } from '@angular/core';
import {UserService} from "./services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  authorities: String[] = this.userService.getAuthorities();

  constructor(private userService: UserService, private router: Router){}

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('authorities');
    this.router.navigate(['/login']);
  }
}
