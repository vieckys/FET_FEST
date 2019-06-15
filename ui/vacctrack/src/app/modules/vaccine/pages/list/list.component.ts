import { Component, OnInit } from '@angular/core';
import { VaccineService } from 'src/app/services/vaccine.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  vaccineList;
  childId = 47;
  constructor(private vaccineService: VaccineService) { }

  ngOnInit() {
    this.getAllVaccineList();
  }

  getAllVaccineList() {
    //this.userId = this.authService.getUser().id;
    this.vaccineService.getAllVaccine({id: this.childId}).subscribe(
      res => {
        this.vaccineList = res;
      }
    )
  }

}
