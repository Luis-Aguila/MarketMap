import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';

import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(next);
    if (this.auth.isAuthenticated() ) {
      console.log('Autentificación exitosa!');
      return true;
    } else {
      this.router.navigate(['/home']);
      console.error('Usted quiere acceder a una página sin autentificarse.');
      console.error('Autentifiquese!!');
      return false;
    }
  }
}
