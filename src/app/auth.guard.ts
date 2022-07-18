import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isAuthenticated = false;
  constructor(private router: Router, private loginService: LoginService) {
this.loginService.user$.subscribe(data => this.isAuthenticated = data);
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("inside auth guard" +localStorage.getItem('isAuthenticated'));
    console.log("inside auth guard" +(localStorage.getItem('isAuthenticated') === 'true'));

      if(localStorage.getItem('isAuthenticated') === 'true') {
      return true;
    }
    this.router.navigate(["login"]);
      return false;

    // return true;

  }

}
