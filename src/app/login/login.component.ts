import {Component, Input} from '@angular/core';
import {LoginService} from '../services/login.service';
import {User} from '../models/user';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {SnackBarService} from '../services/snack-bar.service';


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

  constructor(private loginService: LoginService, private router: Router, private snackBarService: SnackBarService) { }

  @Input() login() {
    this.loginService.login(this.userModel.username, this.userModel.password)
      .subscribe((user: User) => {
        this.userLogin = user;
      }, (error: HttpErrorResponse) => {
        this.error = error;
        console.log(error);
        if (error.status === 200) {
          this.snackBarService.openSnackBar('Login successful', 'ok');
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('token', this.userModel.username);
          this.router.navigate(['/pets']);
        } else {
          alert('Please check your username or password');
        }
      });
  }


}
