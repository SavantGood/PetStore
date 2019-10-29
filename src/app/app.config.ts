import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable()
export class AppConfig {
  private config = null;

  constructor(private http: HttpClient) {}

  public load(): Observable<boolean> {
    const request = this.http.get('./assets/config.json');

    return request.pipe(
      tap((responseData: any) => {
        this.config = responseData;
      })
    );
  }

  public getWebApiUrl(): string {
    return `${this.config.apiUrl}`;
  }
}
