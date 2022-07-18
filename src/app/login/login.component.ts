import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string= '';
  user:User;
  isAuthenticated:boolean;
  constructor(private loginService: LoginService) {
    localStorage.removeItem('user');
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.isAuthenticated = this.user !== null ? true: false;
    console.log(this.user);
  }

  ngOnInit(): void {
    this.loginService.logout();  }
  login() : void {
    this.loginService.login(this.username, this.password);
  }
}
