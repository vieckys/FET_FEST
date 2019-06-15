import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ServerResponse } from 'src/app/models/response.model';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = `${environment.API_ENDPOINT}user/`;
  @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: HttpClient, private router: Router) {}

  isLoggedIn() {
    return this.fireIsLoggedIn;
  }

  register(postData) {
    this.http.post(`${this.url}signup`, postData).subscribe(res => {
      console.log(res);
    });
  }

  login(postData) {
    this.http.post(`${this.url}signin`, postData).subscribe((res: ServerResponse) => {
      if (res.status === 1) {
        this.fireIsLoggedIn.emit(true);
        this.setSession(res.data[0]);
        this.router.navigate(['/dashboard']);
      } else {
        alert('Error occured');
      }
    });
  }

  logout() {
    window.localStorage.removeItem('vc_user');
    this.router.navigate(['/home']);
    this.fireIsLoggedIn.emit(false);
  }

  setSession(user) {
    window.localStorage.setItem('vc_user', JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(window.localStorage.getItem('vc_user'));
  }
}
