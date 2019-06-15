import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    const email = '';
    const name = '';
    const password = '';

    this.registerForm = new FormGroup({
      email: new FormControl(email, Validators.required),
      name: new FormControl(name, Validators.required),
      password: new FormControl(password, Validators.required)
    });
  }

  onSubmit() {
    console.log(this.registerForm.value);
  }

}
