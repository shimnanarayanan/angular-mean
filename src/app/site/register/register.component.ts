import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { GeneralService } from 'src/app/core/services/general.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  submitted: boolean = false;
  currentLanguage: string = '';
  phone: any = '';
  otpStatus: boolean = false;
  otpMSG: any = '';
  registerForm = this.formBuilder.group({
    name: [""],
     email: ['', [Validators.required, Validators.email]],
    phone: [''],
  });
  constructor(
    private generalService: GeneralService,
    private toastr:ToastrModule,
    private router: Router,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void { }

  get f() {
    return this.registerForm.controls;
  }

  submit() {

   
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log('submited false');
      return;
    }

    let data = {

      name: this.registerForm.value.name,
      phone: this.registerForm.value.phone,
      email: this.registerForm.value.email,
      type: 'customer',
    };
    //console.log(formData);
    let apiUrl: string = environment.apiURL + 'auth/customer/signup/';
    this.generalService.addObjectData(apiUrl, data).subscribe(
      (res: any) => {
        this.phone = this.registerForm.value.phone;
        this.otpStatus = true;
      },
      (err: HttpErrorResponse) => {
        // this.toastr.error(err.error.message);
      }
    );
  }

  verifyOTP() {
    let data: any = {
      otp: this.otpMSG,
      phone: this.phone,
    };
    if (localStorage.getItem('DFO_apiID') != null) {
      data.apiId = localStorage.getItem('DFO_apiID');
    }
    //console.log(formData);
    let apiUrl: string = environment.apiURL + 'auth/customer/verify/';
    this.generalService.addObjectData(apiUrl, data).subscribe(
      (res: any) => {
        //this.phone=this.registerForm.value.phone;
        // this.toastr.success('OTP Verifed Successfully', '', {
        //   positionClass: 'toast-top-right',
        //   timeOut: 2500,
        // });
        localStorage.setItem('dfo_auth_token', res.data.token);
        localStorage.setItem('dfo_user_type', 'customer');
        localStorage.setItem('dfo_user_name', res.data.user.name.english);
        localStorage.removeItem('DFO_apiID');
       
        if (localStorage.getItem('dfo_redirect_url') != null) {
          localStorage.removeItem('dfo_redirect_url');
        } else {
          this.router.navigate(['/']);
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }
}
