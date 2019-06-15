import { Component, OnInit } from '@angular/core';
import { ChildService } from 'src/app/services/child.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userId;
  childs: any;

  constructor(private childService : ChildService, private authService : AuthService) {
   }

   getAllChildren() {
    this.userId = this.authService.getUser().id;
    this.childService.getAll({id: this.userId}).subscribe(
      res => {
        this.childs = res;
      }
    )
    console.log(this.childs)
   }

  ngOnInit() {
    this.getAllChildren();
  }
}
