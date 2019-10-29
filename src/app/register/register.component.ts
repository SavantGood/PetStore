import {Component} from '@angular/core';
import {User} from '../models/user';
import {Router} from '@angular/router';
import {RegisterService} from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userForReg: User;
  public modelForReg: User = {
    email: 'null@null',
    firstName: 'null',
    id: 0,
    lastName: 'null',
    password: 'null',
    phone: '+79091186895',
    userStatus: 0,
    username: 'null'
  };

  constructor(private router: Router, private registerService: RegisterService) {}

  public registration() {
    this.registerService.registration(this.modelForReg).subscribe((item: User) => {
      this.userForReg = item;
      alert('Успешная регаистрация пользователя: ' + this.modelForReg.username);
      this.router.navigate(['/login']);
    });
  }

}
