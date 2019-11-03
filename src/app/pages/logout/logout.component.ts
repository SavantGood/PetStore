import {Component, Input} from '@angular/core';
import {LogoutService} from '../../services/logout.service';
import {Router} from '@angular/router';
import {SnackBarService} from '../../services/snack-bar.service';
import {ConfigService} from '../../services/config.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  @Input() public username: string;

  constructor(
    private logoutServices: LogoutService,
    private router: Router,
    private snackBarService: SnackBarService,
    private configService: ConfigService
  ) {
  }


  public logout(): void {
    this.snackBarService.openSnackBar('Logout', 'ok');
    this.logoutServices.logout();
    this.router.navigate(['/login']);
    this.logoutServices.logout().subscribe(() => {
      this.username = null;
      this.configService.username.next(this.username);
    });
  }
}
