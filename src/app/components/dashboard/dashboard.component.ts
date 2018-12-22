import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';


import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router , private auth: AuthService) {
    auth.handleAuthentication();
   }

  ngOnInit() {
  }
  salir() {
    this.auth.logout();
  }
}
