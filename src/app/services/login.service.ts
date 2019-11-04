import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import {AppConfig} from '../app.config';
import {AppState} from '../app.state';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  readonly LOGIN_URL = this.appConfig.getWebApiUrl() + '/user/';

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig,
    private appState: AppState
  ) { }

  login(username: string, password: string): Observable<User> {
    this.appState.username.next(username);
    return this.http.get<User>(this.LOGIN_URL + 'login?username=' + username + '&password=' + password);
  }
}
