import {Component, Input} from '@angular/core';
import {LoginService} from '../services/login.service';
import {User} from '../models/user';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Input() booleanForLogout: boolean;
  userLogin: User;
  error: HttpErrorResponse;
  public userModel: User = {
    username: '',
    password: ''
  } as User;

  constructor(private loginService: LoginService, private router: Router) { }

  @Input() login() {
    this.loginService.login(this.userModel.username, this.userModel.password)
      .subscribe((user: User) => {
        this.userLogin = user;
      }, (error: HttpErrorResponse) => {
        this.error = error;
        console.log(error);
        if (error.status === 200) {
          alert('Login');
          this.router.navigate(['']);
          this.booleanForLogout = true;
        } else {
          alert('Error');
        }
      });
  }


}
