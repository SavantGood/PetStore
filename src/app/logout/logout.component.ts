import {Component, Input} from '@angular/core';
import {LogoutService} from '../services/logout.service';
import {Router} from '@angular/router';
import {SnackBarService} from '../services/snack-bar.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  @Input() username: string;

  constructor(private logoutServices: LogoutService, private router: Router, private snackBarService: SnackBarService) { }


    logout(): void {
    this.snackBarService.openSnackBar('Logout', 'ok');
    this.logoutServices.logout();
    this.router.navigate(['/login']);
  }
}
