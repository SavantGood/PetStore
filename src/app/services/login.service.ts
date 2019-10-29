import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import {AppConfig} from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  readonly LOGIN_URL = this.appConfig.getWebApiUrl() + '/user/';

  constructor(private http: HttpClient, private appConfig: AppConfig) { }

  login(username: string, password: string): Observable<User> {
    return this.http.get<User>(this.LOGIN_URL + 'login?username=' + username + '&password=' + password);
  }
}
