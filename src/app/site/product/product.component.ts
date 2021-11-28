import { formatNumber } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { GeneralService } from 'src/app/core/services/general.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
 
  breadcrumb: any[] = [];
  active = 1;
  currentLanguage: string = '';
  // ImageBaseURL: string = environment.imageBaseURL;
  productKey: any = '';
  productInfo: any;
  quantity: number = 1;

  //product detail change parameters
  price: any = '';
  productImages: any[] = [];
  productID: any = '';


  isUserExist: boolean = false;

  constructor(
    private generalService: GeneralService,
   
    private router: Router,
    private route: ActivatedRoute,
    private toastr:ToastrService
  ) {
    
    this.route.paramMap.subscribe((params) => {
      this.productKey = params.get('id');

      this.getProductData();
    });
  }

 

  ngOnInit(): void {
    console.log(localStorage.getItem('dfo_auth_token'))
    if (localStorage.getItem('dfo_auth_token') != null) {
      this.isUserExist = true;
    }
  }


  

  getProductData(){
    let api = environment.apiURL + 'api/customer/product/' + this.productKey;
    this.generalService.listData(api).subscribe(
      (res: any) => {
        this.productInfo = res.data;
        this.productID = this.productInfo._id;
        // this.productImages = this.productInfo.additionalImages;
        // this.productImages.unshift(this.productInfo.mainImage);
        this.price =
         this.productInfo.price
          
       
       
      },
      (err: HttpErrorResponse) => {
       
      }
    );
  }


 
 

  
  updateQuantity(action: string) {
    if (action == 'plus') {
      this.quantity = this.quantity + 1;
    } else {
      if (this.quantity > 1) {
        this.quantity = this.quantity - 1;
      }
    }
  }

  addToCart() {
    let cartApi = '';
    if (localStorage.getItem('dfo_auth_token') != null) {
      
      cartApi = environment.apiURL + 'api/customer/add/cart';
    }else{
      this.router.navigate(['/login']);
    }
    
    let data: any = {
      antique: this.productID,
      quantity: this.quantity,
    };

   
  
    
    this.generalService.addObjectData(cartApi, data).subscribe(
      (res: any) => {
        this.toastr.success(res.message);
      },
      (err: HttpErrorResponse) => {
      }
    );
  
}
  buyNow() {
    this.addToCart();
    this.router.navigate(['/cart']);
  }

  addToWishlist() {
    if (localStorage.getItem('dfo_auth_token') == null) {
      this.router.navigate(['/login']);
    }
    let favApi = environment.apiURL + 'api/customer/product/favorite';
    let data: any = {
      antique: this.productInfo._id,
    };

    this.generalService.addObjectData(favApi, data).subscribe(
      (res: any) => {
        this.toastr.success(res.message);
        let fav = this.productInfo.favorite;
        this.productInfo.favorite = !fav;
      },
      (err: HttpErrorResponse) => {
        console.log(err)
        // this.toastr.error(err.error.message[this.currentLanguage]);
      }
    );
  }

 
}
