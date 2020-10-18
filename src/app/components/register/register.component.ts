import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PasswordMatch } from './passwordmatch';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private  authService: AuthService) { }

  registerForm: FormGroup;
  submitted = false;


  ngOnInit(): void {
    this.registerForm =  this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email : ['', Validators.required],
      password : ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, {
      validator: PasswordMatch('password', 'confirmPassword')
    });
  }

  // tslint:disable-next-line: typedef
  get f() { return this.registerForm.controls; }

  // tslint:disable-next-line: typedef
  submit() {
    this.submitted = true;

    if (this.registerForm.valid){
      this.authService.register(this.registerForm.value);
    }
  }
}
