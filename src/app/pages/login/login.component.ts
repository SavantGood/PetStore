import {Component} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {User} from '../../models/user';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {SnackBarService} from '../../services/snack-bar.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public isComplete = true;
  private error: HttpErrorResponse;
  public userModel: User = {
    username: '',
    password: ''
  };

  constructor(private loginService: LoginService, private router: Router, private snackBarService: SnackBarService) { }

  public login(): void {
    this.isComplete = false;
    this.loginService.login(this.userModel.username, this.userModel.password)
      .subscribe(() => {
        this.isComplete = true;
      }, (error: HttpErrorResponse) => {
        this.error = error;
        if (error.status === 200) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('token', this.userModel.username);
          this.snackBarService.openSnackBar('Login successful', 'ok');
          this.router.navigate(['/pets']);
          this.isComplete = true;
        } else {
          this.snackBarService.openSnackBar('Please check your username or password', 'ok');
          this.isComplete = true;
        }
      });
  }
}
