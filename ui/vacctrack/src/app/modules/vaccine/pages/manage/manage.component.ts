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
  constructor(private vaccineService : VaccineService, private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    let vaccinName: string;
    let children_id = 47;
    let date: string;
    let done: string;

    this.vaccineForm = new FormGroup({
      vaccinName: new FormControl(vaccinName, Validators.required),
      children_id: new FormControl(children_id, Validators.required),
      date: new FormControl(date, Validators.required),
      done: new FormControl(done, Validators.required)
    });
  }

  onSubmit() {
    this.vaccineService.add(this.vaccineForm.value);

    console.log('----->', this.vaccineForm.value);
  }

}
