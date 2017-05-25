import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private _router:Router, private _authService: AuthService) { }

  ngOnInit() {
    
  }
  logout(): void {
    this._authService.isLoggedIn = false;
    this._router.navigate(['/home']);
    localStorage.removeItem('token');
  }
}
