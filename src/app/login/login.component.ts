import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router }      from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  statusMessage: string; //If user provided bad credintials, show status message
  message: string;
  constructor(public _authService: AuthService, public _router: Router) {}
  
  public loginForm = new FormGroup({
    email: new FormControl(null, [
      Validators.required, 
      Validators.pattern(
        '[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*'
      )
    ]),
    password: new FormControl(null, [
        Validators.required,
        Validators.minLength(4), 
        Validators.maxLength(20),
        Validators.pattern(
          '(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)'
        )
      ]
    )}
  );

  ngOnInit() {
    if(this._authService.isLoggedIn) {
      this._router.navigate(['/dashboard']);
    }
  }
  
  login() {
    this.setMessage();
    this._authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(value  => {
        if (value.loggedIn) {
          this._authService.isLoggedIn = true;
          this.clearMessage();
          //Save the token
          localStorage.setItem('token', value.token);
          // Get the redirect URL from our auth service
          // If no redirect has been set, use the default
          let redirect = this._authService.redirectUrl ? this._authService.redirectUrl : '/dashboard';
          // Redirect the user
          this._router.navigate([redirect]);
        } else {
          this.setStatusMessage(value.message);
          this.clearMessage();
        }
      });
    /*
    this.setMessage();
    this._authService.login().subscribe(() => {
      if (this._authService.isLoggedIn) {
        this.clearMessage();
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this._authService.redirectUrl ? this._authService.redirectUrl : '/dashboard';
        // Redirect the user
        this._router.navigate([redirect]);
      }
    });*/
  }
  setMessage() {
    this.message = "Loging in..."
  }
  clearMessage() {
    this.message = null;
  }
  setStatusMessage(message: string) {
    this.statusMessage = message;
  }

}
