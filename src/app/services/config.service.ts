import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  configUrl = 'https://petstore.swagger.io/v2/';

  constructor(private http: HttpClient) {}

  getConfig() {
    this.http.get('./assets/config.json').pipe(
      tap((result) => {
        console.log(result);
      })
    );
  }

}
