import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  // readonly OUT_URL = this.appConfig.getWebApiUrl() + '/user/logout';
  constructor() { }

  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
  }
}
