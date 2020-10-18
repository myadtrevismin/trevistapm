import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // tslint:disable-next-line: typedef
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      if (this.authenticationService.isLoggedIn) {
            return true;
        } else {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
  }

  constructor( private router: Router,
               private authenticationService: AuthService) {

    }
}
