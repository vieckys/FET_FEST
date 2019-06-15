import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: any;
  isAuth: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.checkIfLogin();
    this.authService.isLoggedIn.subscribe((res: boolean) => {
      this.isAuth = res;
    });
  }

  checkIfLogin() {
    if (window.localStorage.getItem('vc_user')) {
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }
    this.getUser();
  }

  getUser() {
    this.user = this.authService.getUser();
  }

  onLogout() {
    window.localStorage.removeItem('vc_user');
    this.checkIfLogin();
    this.router.navigate(['/home']);
  }
}
