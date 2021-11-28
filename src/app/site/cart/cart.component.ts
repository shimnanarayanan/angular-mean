import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/core/services/general.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartInfo: any = '';
  dataLoaded: boolean = false;
  totalQuantity: number = 0;
  constructor(
    private generalService:GeneralService,
    private route:Router,
    private  toastr:ToastrModule

  ) { }
 
  ngOnInit(

   
  ): void {
    this.cartList()
  }



  cartList(): any {
     let cartApi = environment.apiURL + 'api/customer/cart/list';
    if (localStorage.getItem('DFO_apiID') != null && localStorage.getItem('dfo_auth_token')==null) {
      cartApi = cartApi + '?apiId=' + localStorage.getItem('DFO_apiID');
    }
    this.generalService.listData(cartApi).subscribe(
      (res: any) => {
        this.cartInfo = res.data;
        this.dataLoaded = true;
        if (this.cartInfo.cartItems?.length > 0) {
          let quantity = 0;
          this.cartInfo.cartItems.forEach((element: any) => {
            quantity = quantity + element.quantity;
          });
          this.totalQuantity = quantity;
        }
      },
      (err: HttpErrorResponse) => {
        // this.toastr.error(err.error.message);
      }
    );
     
  }

  updateQuantity(item: any, action: string) {
    let quantity = 0;
    if (action == 'plus') {
      quantity = item.quantity + 1;
    } else {
      if (item.quantity > 1) {
        quantity = item.quantity - 1;
      }
    }
    this.updateCart(item,quantity);
  }

  removeItem(item:any){
    this.updateCart(item,0)
  }

  updateCart(item: any, quantity: number) {
    let cartApi = '';
    if (localStorage.getItem('dfo_auth_token') != null) {
      cartApi = environment.apiURL + 'api/customer/add/cart';
    } else {
      cartApi = environment.apiURL + 'api/customer/add/cart';
    }
    let data: any = {
      antique: item.antique._id,
      quantity: quantity,
    };


  
    if (localStorage.getItem('DFO_apiID') != null) {
      data.apiId = localStorage.getItem('DFO_apiID');
    }
    this.generalService.addObjectData(cartApi, data).subscribe(
      (res: any) => {
        // this.cartService.setCartData(res.data);
        this.cartInfo = res.data;
        // let currentUrl = this.route.url;
        // this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        //   this.route.navigate([currentUrl]);
        // });
        // this.toastr()
      },
      (err: HttpErrorResponse) => {
        // this.toastr.error(err.error.message[this.currentLanguage]);
      }
    );
  }

}
