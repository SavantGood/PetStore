import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  readonly LOGIN_URL = 'https://petstore.swagger.io/v2/user/';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<User> {
    return this.http.get<User>(this.LOGIN_URL + 'login?username=' + username + '&password=' + password);
  }
}
