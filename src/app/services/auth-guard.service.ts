import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';

import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
//Inicializa el servicio de Authservice
  constructor(private auth: AuthService, private router: Router) { }
//Crea un estado de autentificación
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(next);
    //Si esta autentificado, pasara el guard
    if (this.auth.isAuthenticated() ) {
      console.log('Autentificación exitosa!');
      return true;
    } else {
    //Si no esta autentificado, no accedera a la pagina
      this.router.navigate(['/home']);
      console.error('Usted quiere acceder a una página sin autentificarse.');
      console.error('Autentifiquese!!');
      return false;
    }
  }
}
