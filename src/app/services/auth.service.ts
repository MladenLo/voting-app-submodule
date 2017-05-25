import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;
  redirectUrl: string;
  loginUrl: string = 'https://build-voting-app-mladenlo.c9users.io/api/user/login';
  signupUrl: string = 'https://build-voting-app-mladenlo.c9users.io/api/user/signup';
    constructor( private _http: Http ) {
      
    }
    
    login( email: string, password: string ): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        return this._http.post(this.loginUrl, { "email": email, "password": password }, options)
                    .map(this.extractData);
    }
    
    signup( username: string, email: string, password: string, confirmPassword: string ): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        return this._http.post(this.signupUrl, { "username": username, "email": email, "password": password, "confirmPassword": confirmPassword }, options)
                    .map(this.extractData);
    }
    
    private extractData(res: Response) {
      let body = res.json();
      return body;
    }
}

/*import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(): Observable<boolean> {
    return Observable.of(true).delay(3000).do(val => this.isLoggedIn = true);
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}*/