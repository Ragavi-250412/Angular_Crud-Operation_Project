import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, TitleStrategy } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public userSubject:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public user$: Observable<boolean>;
  constructor(private router: Router) {
    this.user$ = this.userSubject.asObservable();
    if(localStorage.getItem('isAuthenticated')=== 'true'){
      this.userSubject.next(true);
    }
  }
  public get userValue(): boolean {
    return this.userSubject.value;
  }

  login(username: any, password: any) {
    if(username == 'admin' && password == 'admin'){
localStorage.setItem('isAuthenticated', 'true');
this.userSubject.next(true);
      this.router.navigate(["home"]);
     }else {
      this.router.navigate(["unauthorized"]);
     }
   }

   logout() {
    // remove user from local storage to log user out
    localStorage.setItem('isAuthenticated', 'false');
    this.userSubject.next(false);
    this.router.navigate(['/login']);
  }
  }
