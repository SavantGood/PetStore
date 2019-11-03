import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  private readonly OUT_URL = this.appConfig.getWebApiUrl() + '/user/logout';
  constructor(
    private http: HttpClient,
    private appConfig: AppConfig
  ) { }

  public logout(): Observable<any> {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
    return this.http.get<any>(this.OUT_URL);
  }
}
