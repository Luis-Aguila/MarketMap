// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
//Importa todas las caracteristicas de Auth0
import * as auth0 from 'auth0-js';

(window as any).global = window;
@Injectable()
export class AuthService {

  public userProfile: any;
//Se crea un objeto de servicio auth0 
  auth0 = new auth0.WebAuth({
    clientID: 'M351aC09y8Ixiz6i7edKzM5i1GAFwwFC',
    domain: 'luisaguila.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200/callback',
    scope: 'openid profile'
  });
//Se cargan las rutas
  constructor(public router: Router) {}
//Se carga la autentificación o sistema de logeo
  public login(): void {
    this.auth0.authorize();
  }
//Se procesa la información
  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/dashboard']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }
//Se guarda la sesión en el localStorage
  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }
//Se Revoca la sesión
  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }
//True si esta autentificado, false si no
  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    return new Date().getTime() < expiresAt;
  }
//Trae información del perfil del usuario
  public getProfile(cb): void {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    throw new Error('Access Token must exist to fetch profile');
  }

  const self = this;
  this.auth0.client.userInfo(accessToken, (err, profile) => {
    if (profile) {
      self.userProfile = profile;
    }
    cb(err, profile);
  });
}

}
