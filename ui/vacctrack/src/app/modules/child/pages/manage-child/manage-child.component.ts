import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ChildService } from 'src/app/services/child.service';

@Component({
  selector: 'app-manage-child',
  templateUrl: './manage-child.component.html',
  styleUrls: ['./manage-child.component.scss']
})
export class ManageChildComponent implements OnInit {
  childForm: FormGroup;

  constructor(private authService: AuthService, private childService: ChildService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    let name: string;
    let dob: string;
    let gender: string;
    let weight: string;
    let height: string;
    let comments: string;
    let user_id = this.authService.getUser().id;

    this.childForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      dob: new FormControl(dob, Validators.required),
      gender: new FormControl(gender, Validators.required),
      weight: new FormControl(weight, Validators.required),
      height: new FormControl(height, Validators.required),
      comments: new FormControl(comments, Validators.required),
      user_id: new FormControl(user_id)
    });
  }

  onSubmit() {
    this.childService.add(this.childForm.value);

    console.log(this.childForm.value);
  }

}
