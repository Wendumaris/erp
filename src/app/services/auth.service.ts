import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { EnvService } from './env.service';
import { LoginResponse } from '../models';
import { getLocalStorage, setLocalStorage, removeLocalStorage } from '../helpers';

import { MatDialog } from '@angular/material';
import { AlertComponent } from './../shared';
 

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn = false;
  token = null;
  depth = 0;
  toastr: any;

  constructor(private http: HttpClient,
    private router: Router,
    public dialog: MatDialog,
    private env: EnvService) { }

  cleanObject(obj) {
    this.depth += 1;
    // eslint-disable-next-line no-restricted-syntax
    for (const propName in obj) {
        if (!obj[ propName ] || obj[ propName ].length === 0) {
            delete obj[ propName ];
        } else if (typeof obj === 'object') {
            if (this.depth <= 3) {
              this.cleanObject(obj[ propName ]);
            }
        }
    }
    return obj;
  }

  async postLogin(data, element): Promise<LoginResponse> {
    const payload = this.cleanObject(data);
    console.log('auth.service: payload =>', payload);
    const response = this.http.post(this.env.API_URL + '/staff/login', payload)
    .pipe(tap((res: LoginResponse) => {
      element.removeClass('running');
        console.log('auth.service: res =>', res);
      if (res.success) {
        this.timedAlert('Login successful', 'Welcome! PMT Terminal Admin');
        const { user, token } = res.payload;
        if (setLocalStorage('user', user, null)) {
          console.log('User info stored');
        } else {
          console.error('Error storing item customer');
        }
        if (setLocalStorage('token', token, null)) {
            console.log('Token string stored');
          } else {
          console.error('Error storing item token');
          }
        this.token = token;
        this.isLoggedIn = true;
        const intendURL = getLocalStorage('intendURL') === null ? '/dashboard' : getLocalStorage('intendURL');
        this.router.navigate([intendURL]);
      } else {
        this.timedAlert('', res.message);
        this.token = null;
        this.isLoggedIn = false;
      }
      }));
      return await response.toPromise();
  }


  timedAlert(title, message): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      data: {
        title: title,
        text: message,
        time: 2000
      }
    });
  }

  register(data: any) {
    const payload = this.cleanObject(data);
    return this.http.post(this.env.API_URL + '/staff', payload);
  }

  logout() {
    this.isLoggedIn = false;
    delete this.token;
    return removeLocalStorage('token');
  }

  getUser() {
    return getLocalStorage('user');
  }

  public async getToken(): Promise<any> {
    try {
      const token = await getLocalStorage('token');
      if (token != null) {
        this.token = token;
        this.isLoggedIn = true;
      } else {
        this.token = null;
        this.isLoggedIn = false;
      }
      return token;
    } catch (e) {
      console.log(e);
      alert(JSON.stringify(e));
      return null;
    }
  }

  userLogOut() {
    removeLocalStorage('user');
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    if (getLocalStorage('user')) {
      return true;
    } else {
      // Once the server is back return will
      // be change to false
      return false;
    }
  }

}
