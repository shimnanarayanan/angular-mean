import { formatNumber } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/core/services/general.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  @Input() productItem: any;
 
  price: any = 0;
  constructor(
    private generalService: GeneralService,
  
    private router: Router
  ) {
    
  }

  ngOnInit(): void {
    this.price = this.productItem.price;
   
  }

  addToCart(productData: any) {
    let cartApi = '';
    if (localStorage.getItem('mow_auth_token') != null) {
      cartApi = environment.apiURL + 'api/customer/add/cart';
    } else {
      cartApi = environment.apiURL + 'api/customer/add/cart'
    }
    let data: any = {
      antique: productData._id,
      quantity: 1,
    };
  
      if (localStorage.getItem('mw_apiID') != null) {
        data.apiId = localStorage.getItem('mw_apiID');
      }
      this.generalService.addObjectData(cartApi, data).subscribe(
        (res: any) => {
          if (localStorage.getItem('mow_auth_token') == null) {
            localStorage.setItem('mw_apiID', res.data.cartTotal.apiId);
          }
         
        },
        (err: HttpErrorResponse) => {
          // this.toastr.error(err.error.message[this.currentLanguage]);
        }
      );
    
  }

  addToWishlist(product: any) {
    //this.productService.addToWishlist(product);
    if (localStorage.getItem('mow_auth_token') == null) {
      this.router.navigate(['/login']);
    } else {
      let favApi = environment.apiURL + 'api/customer/product/favorite';

      let data: any = {
        product: product._id,
      };

      this.generalService.addObjectData(favApi, data).subscribe(
        (res: any) => {
         
          let fav = product?.favorate;
          product.favorate = !fav;
        },
        (err: HttpErrorResponse) => {
          // this.toastr.error(err.error.message[this.currentLanguage]);
        }
      );
    }
  }

 
}
