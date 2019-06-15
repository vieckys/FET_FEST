import { Component, OnInit } from '@angular/core';
import { VaccineService } from 'src/app/services/vaccine.service';
import { ActivationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  vaccineList;
  childId: any;
  constructor(private vaccineService: VaccineService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      if (param.childId) {
        this.childId = param.childId;
      }
    });
    this.getAllVaccineList();
  }

  getAllVaccineList() {
    this.vaccineService.getAllVaccine({id: this.childId}).subscribe(
      res => {
        this.vaccineList = res;
      }
    )
  }

}
