import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    console.log("inside admin gaurd")
    const userRole = this.loginService.getUserRole()
    console.log(this.loginService.isLoggedIn())
    console.log(userRole)
    if (this.loginService.isLoggedIn() && this.loginService.getUserRole() == 'ADMIN') {
      console.log("admin can activate ")
      return true;
    } else {
      // Redirect to login or unauthorized page
      console.log("redirect to login")
      return this.router.createUrlTree(['/login']);
    }
  }
}
