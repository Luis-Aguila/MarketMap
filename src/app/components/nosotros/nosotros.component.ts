import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent implements OnInit {
  //Se crea una variable de tipo any vacia
  profile: any;
  //Se inicializan las rutas y el servicio de Auth0
  constructor( private router: Router , public auth: AuthService) {
    //Se analiza la autentificación
    auth.handleAuthentication();
  }

  ngOnInit() {
    //Si el usuario esta autentificado, cargara los datos del usuario, si no lo esta, no los cargara
    if ( this.auth.isAuthenticated()) {
      if (this.auth.userProfile) {
        this.profile = this.auth.userProfile;
      } else {
        this.auth.getProfile((err, profile) => {
          this.profile = profile;
        });
      }
    }
  }

//carga el la pagina de autentificación
  login() {
    this.auth.login();
  }
  //Se cierra sesión
  salir() {
    this.auth.logout();
  }

}
