import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  childs: any = [{
    id: 1,
    name: 'Ankit',
    age: 10,
    gender: 'male',
    weight: 20,
    vaccine: {
      id: 1,
      name: 'Polio',
      date: '17-05-2019'
    }
  }, {
    id: 2,
    name: 'Hemant',
    age: 15,
    gender: 'male',
    weight: 30,
    vaccine: {
      id: 1,
      name: 'Polio',
      date: '18-05-2019'
    }
  }];

  constructor() { }

  ngOnInit() {
  }

}
