import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  readonly REG_URL = 'https://petstore.swagger.io/v2/user/';
  userForReg: User;
  public modelForReg: User = {
    email: null,
    firstName: null,
    id: null,
    lastName: null,
    password: null,
    phone: null,
    userStatus: null,
    username: null
  }

  constructor(private http: HttpClient, private router: Router) {}

  public registration() {
    this.http.post<User>(this.REG_URL, this.modelForReg).subscribe((item: User) => {
      this.userForReg = item;
      alert('Успешная регаистрация пользователя: ' + this.modelForReg.username);
      this.router.navigate(['/login']);
    });
  }

}
