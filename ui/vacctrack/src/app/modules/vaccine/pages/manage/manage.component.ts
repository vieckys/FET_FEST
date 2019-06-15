import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { VaccineService } from 'src/app/services/vaccine.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  vaccineForm: FormGroup;
  editFlag = false;
  singleRecord: any;
  childId: any;
  id: any;
  constructor(private vaccineService : VaccineService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe(param => {
      if (param.childId) {
        this.childId = param.childId;
        this.id = param.id;
      }
      if (param.id) {
        this.editFlag = true;
      }
    });

    if (this.editFlag) {
      this.editVaccine();
    }
    this.initForm();
  }

  initForm() {
    const vaccinName =  this.singleRecord ? this.singleRecord.vaccinName : '';
    const children_id =  this.singleRecord ? this.singleRecord.children_id : this.childId;
    const date =  this.singleRecord ? this.singleRecord.date : '';

    this.vaccineForm = new FormGroup({
      id: new FormControl(this.id),
      vaccinName: new FormControl(vaccinName, Validators.required),
      children_id: new FormControl(children_id),
      date: new FormControl(date, Validators.required)
    });
  }

  
  editVaccine() {
    const data = {
      children_id: this.childId,
      id: this.id
    };
    this.vaccineService.editVaccine(data).subscribe(res => {
      this.singleRecord = res.data[0];
      this.initForm();
    });
  }

  onSubmit() {
    if (this.editFlag) {
      this.vaccineService.update(this.vaccineForm.value);
    } else {
      this.vaccineService.add(this.vaccineForm.value);
    }
  }

}
