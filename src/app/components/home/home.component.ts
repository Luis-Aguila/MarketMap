import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  profile: any;

  constructor( private router: Router , public auth: AuthService) {
    auth.handleAuthentication();
  }


  ngOnInit() {
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


  login() {
    this.auth.login();
  }
  salir() {
    this.auth.logout();
  }




}
