import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router }      from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor( public _authService: AuthService, public _router: Router ) { }
  ngOnInit() {
  }
  
  statusMessage; //After signup is complete, or we have error, show it to the user
  message: string;
    public signupForm = new FormGroup({
      username: new FormControl(null, [
          Validators.required,
          Validators.minLength(4), 
          Validators.maxLength(20),
          Validators.pattern(
            '[a-zA-Z0-9_]+'
          )
        ]
      ),
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
      ),
      confirmPassword: new FormControl(null, [
          Validators.required
        ]
      )
    });
  
  signup() {
    this.statusMessage = null;
    this.setMessage();
    this._authService.signup(this.signupForm.value.username, this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.confirmPassword)
      .subscribe(value  => {
        if (value.userSignup) {
          this.setStatusMessage(value);
          this.clearMessage();
        } else {
          this.setStatusMessage(value);
          this.clearMessage();
        }
      });
  }
  
  setMessage() {
    this.message = "Registering..."
  }
  clearMessage() {
    this.message = null;
  }
  setStatusMessage(message: string) {
    this.statusMessage = message;
  }

}
