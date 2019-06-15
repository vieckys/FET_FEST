import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    const email = '@gmail.com';
    const name = '';
    const password = '123456';

    this.registerForm = new FormGroup({
      email: new FormControl(email, Validators.required),
      name: new FormControl(name, Validators.required),
      password: new FormControl(password, Validators.required)
    });
  }

  onSubmit() {
    this.authService.register(this.registerForm.value)
  }

}
