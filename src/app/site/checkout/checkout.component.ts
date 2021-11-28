import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GeneralService } from 'src/app/core/services/general.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartInfo: any = '';
  dataLoaded: boolean = false;
  constructor(
    private generalService: GeneralService,
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getCartList();
  }

  getCartList() {
    let cartApi = environment.apiURL + 'api/customer/cart/list';
    this.generalService.listData(cartApi).subscribe(
      (res: any) => {
        this.cartInfo = res.data;
        this.dataLoaded = true;
      },
      (err: HttpErrorResponse) => {
        this.toastr.error(err.error.message);
      }
    );
  }

  placeOrder() {
    this.toastr.success("Placed Order");
    this.router.navigate(['/']);
  }

}
