import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup,Validators,FormBuilder } from "@angular/forms";

import { AuthService } from '../auth.service';
import { $ } from 'protractor';

export class User {
  constructor(public email: string,
              public password: string) {
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() loggedIn = new EventEmitter<User>();
  form: FormGroup;
  needLogin: boolean = true;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.authService.isAuthenticated().then((isAuthenticated) => {
      this.needLogin = !isAuthenticated;
    });

    this.form = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]]
    });
  }
  /* 
  needsLogin() {
    return !this.authService.isAuthenticated();
  } */

  login() {
    console.log(`Login: ${this.form.value}`);

    if(this.form.valid) {
      this.loggedIn.emit(new User(this.form.value.email, this.form.value.password));
    }
  }

}
