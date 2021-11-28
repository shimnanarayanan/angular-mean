import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GeneralService } from 'src/app/core/services/general.service';
import { ToastrService } from 'ngx-toastr';

import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  phone: any = '';
  otp: any = '';
  submitted: boolean = false;
  otpStatus:boolean=false;
  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private generalService:GeneralService,
    private toastr: ToastrService,

  ) {

   
   }

  ngOnInit(): void {
  }

  

 
  login(){
    this.submitted = true;
    let loginApi = environment.apiURL + 'auth/customer/signin';
   
        let data = {
          phone: this.phone,
          type: 'customer',
        };
       
        this.generalService.addObjectData(loginApi, data).subscribe(
          (res: any) => {
            this.otpStatus = true;
          },
          (err: HttpErrorResponse) => {
            this.toastr.error(err.error.message);
           ;
           
          })
  }

  verifyOTP() {
    let data: any = {
      otp: this.otp,
      phone: this.phone,
    };
    if (localStorage.getItem('DFO_apiID') != null) {
      data.apiId = localStorage.getItem('DFO_apiID');
    }
    //console.log(formData);
    let apiUrl: string = environment.apiURL + 'auth/customer/verify/';
    this.generalService.addObjectData(apiUrl, data).subscribe(
      (res: any) => {
        // this.phone=this.registerForm.value.phone;
        // this.toastr.success('OTP Verifed Successfully', '', {
        //   positionClass: 'toast-top-right',
        //   timeOut: 2500,
        // });
        localStorage.setItem('dfo_auth_token', res.data.token);
        localStorage.setItem('dfo_user_type', 'customer');
        localStorage.setItem('dfo_user_name', res.data.user.name);
       
       
        if(localStorage.getItem('dfo_redirect_url')!=null){
         localStorage.getItem('dfo_redirect_url');
          localStorage.removeItem('dfo_redirect_url');
         
        }else{
          this.router.navigate(['/home']);
        }
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }



 
  }


