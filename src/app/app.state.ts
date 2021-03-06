import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class AppState {
  public readonly username  = new BehaviorSubject<string>(null);
  public readonly username$ = this.username.asObservable();

  constructor() {
    const token = localStorage.getItem('token');
    if (token) {
      this.username.next(token);
    }
  }
}
