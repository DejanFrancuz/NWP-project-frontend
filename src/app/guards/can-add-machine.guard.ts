import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Injectable} from "@angular/core";
import {UserService} from "../services/user.service";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class AddMachinePermissionsGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
    const authorities = localStorage.getItem('authorities');


    if (authorities && authorities.includes("can_create_machine")) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
