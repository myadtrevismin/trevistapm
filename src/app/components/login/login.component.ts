import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private  authService: AuthService) { }

  loginForm: FormGroup;
  submitted = false;

  ngOnInit(): void {
  this.loginForm =  this.fb.group({
    email : ['', Validators.required],
    password : ['', Validators.required],
  });
  }

  // tslint:disable-next-line: typedef
  get f() { return this.loginForm.controls; }

  // tslint:disable-next-line: typedef
  submit(){
    this.submitted = true;

    if (this.loginForm.valid){
     this.authService.login(this.f.email.value, this.f.password.value);
    }
  }

}
