import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';
import { LoginService } from './services/login.service';
import { observable, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'crud-application';
  user: any;
  isLoggedIn: any;
  constructor(private router: Router, private loginService: LoginService) {
    this.loginService.user$.subscribe((x) => (this.isLoggedIn = x));
    console.log('IsAuthenticated' + this.isLoggedIn);
  }

  logout() {
    this.loginService.logout();
  }

  loadEmployee() {
    this.router.navigate(['employee']);
  }
}
