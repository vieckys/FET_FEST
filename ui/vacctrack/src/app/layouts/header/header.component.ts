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
  isLoggedIn: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    if (this.isLoggedIn) {
      this.user = this.authService.getUser();
    }
  }

  onLogout() {
    window.localStorage.removeItem('vc_user');
    this.router.navigate(['/home']);
    // this.authService.isLoggedIn().subscribe(customObject => {
    //   this.isLoggedIn = customObject;
    // });
    // this.authService.logout();
  }
}
