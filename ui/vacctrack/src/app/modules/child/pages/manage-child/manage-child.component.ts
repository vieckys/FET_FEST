import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-child',
  templateUrl: './manage-child.component.html',
  styleUrls: ['./manage-child.component.scss']
})
export class ManageChildComponent implements OnInit {
  childForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
  let name: string;
  let dob: string;
  let age: number;
  let gender: string;
  let weight: string;
  let height: string;
  let comments: string;

    this.childForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      dob: new FormControl(dob, Validators.required),
      age: new FormControl(age, Validators.required),
      gender: new FormControl(gender, Validators.required),
      weight: new FormControl(weight, Validators.required),
      height: new FormControl(height, Validators.required),
      comments: new FormControl(comments, Validators.required)
    });
  }

  onSubmit() {
    console.log(this.childForm.value);
  }

}
