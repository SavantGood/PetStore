import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {AppConfig} from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private readonly REG_URL = this.appConfig.getWebApiUrl() + '/user/';

  constructor(private http: HttpClient, private appConfig: AppConfig) {}

  public registration(user: User): Observable<User> {
    return this.http.post<User>(this.REG_URL, user);
  }
}
