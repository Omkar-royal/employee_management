import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Router, RouterLink } from '@angular/router';
import { RestApiServiceService } from '../services/rest-api-service.service';
import { AuthorizationServiceService } from '../services/authorization-service.service';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { InputValidationsService } from '../services/input-validations.service';
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  //Input Fields
  form = this.fb.group({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  // Status 
  loader = false;
  isFormSubmitted = false;
  signInLoader: boolean = false;
  //Error Messages 
  usernameErrorMessage: string = '';
  profileErrorMessage: string = '';
  errorMessage: string = '';
  constructor(public api: RestApiServiceService, private fb: FormBuilder, public router: Router, public auth: AuthorizationServiceService, public validate: InputValidationsService) {

    auth.verifyAdminCredentials().subscribe(res => {
      if (res) {
        this.router.navigate(['']);
      }
    });
  }


  signIn() {
    this.signInLoader = true;
    this.isFormSubmitted = true;


    if (this.form.valid) {
      this.api.postData('sign-in', this.form.value).then(
        (response: any) => {
          localStorage.setItem("token", response.data.token);
          this.router.navigate([''])

        },
        error => {
          this.errorMessage = error.error.message;
        },
      ).finally(() => {
        this.signInLoader = false;
      })
    } else {
      this.signInLoader = false;
    }
  }

}




