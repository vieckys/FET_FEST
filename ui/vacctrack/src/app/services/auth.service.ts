import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ServerResponse } from 'src/app/models/response.model';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = `${environment.API_ENDPOINT}user/`;
  @Output() isLoggedIn = new Subject();

  constructor(private http: HttpClient, private router: Router) {}

  register(postData): Observable<any> {
    return this.http.post(`${this.url}signup`, postData).pipe(
      map(res => {
        return res;
      })
    );
  }

  login(postData): Observable<any> {
    return this.http.post(`${this.url}signin`, postData).pipe(
      map((res: ServerResponse) => {
        if (res.status === 1) {
          this.isLoggedIn.next(true);
          this.setSession(res.data[0]);
          this.router.navigate(['/dashboard']);
        } else {
          alert('Error occured');
        }
      }),
      catchError(err => {
        console.log(err);
        return err;
      })
    );
  }

  logout() {
    window.localStorage.removeItem('vc_user');
    this.router.navigate(['/home']);
  }

  setSession(user) {
    window.localStorage.setItem('vc_user', JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(window.localStorage.getItem('vc_user'));
  }
}
