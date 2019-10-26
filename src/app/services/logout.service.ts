import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  readonly OUT_URL = 'https://petstore.swagger.io/v2/user/logout';
  constructor(private http: HttpClient) { }

  logout() {
    return this.http.get(this.OUT_URL);
  }
}
