import {Component, OnInit} from '@angular/core';
import {User} from "../model";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit{
  users: User[] = [];
  authorities: String[] = this.userService.getAuthorities();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  hasPermission(permission: string): boolean {
    const authorities = localStorage.getItem('authorities');
    if (authorities !== null) {
      if (authorities.includes(permission)) {
        return true;
      }
    }
    return false;
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe();
  }


}
