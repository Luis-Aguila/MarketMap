import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';


import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
//Se crea una variable de tipo any vacia
  profile: any;
//Se inicializan las rutas y el servicio de Auth0
  constructor( private router: Router , public auth: AuthService) {}

  ngOnInit() {
    //Si el usuario esta autentificado, cargara los datos del usuario, si no lo esta, no los cargara
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }
  }
//Se cierra sesión
  salir() {
    this.auth.logout();
  }
}
