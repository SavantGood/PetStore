import {Component} from '@angular/core';
import {LogoutService} from '../services/logout.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private logoutServices: LogoutService, private route: Router) { }

  logout() {
    this.logoutServices.logout();
    alert('Вы вышли');
    this.route.navigate(['']);
  }

}
