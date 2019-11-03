import {Component} from '@angular/core';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {RegisterService} from '../../services/register.service';
import {SnackBarService} from '../../services/snack-bar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private userForReg: User;
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

  constructor(private router: Router, private registerService: RegisterService, private snackBarService: SnackBarService) {}

  public registration(): void {
    this.registerService.registration(this.modelForReg).subscribe((item: User) => {
      this.userForReg = item;
      this.snackBarService.openSnackBar('Great registration: ' + this.modelForReg.username, 'ok');
      this.router.navigate(['/login']);
    });
  }

}
