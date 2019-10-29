import {Injectable, Input} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {SnackBarService} from './services/snack-bar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private snackBarService: SnackBarService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.verifyLogin(url);
  }

  @Input() verifyLogin(url): boolean {
    if (!this.isLoggedIn()) {
      this.snackBarService.openSnackBar('Enter your account', 'Cancel');
      this.router.navigate(['/login']);
      return false;
    } else if (this.isLoggedIn()) {
      return true;
    }
  }
  public isLoggedIn(): boolean {
    let status = false;
    status = localStorage.getItem('isLoggedIn') === 'true';
    return status;
  }
}

