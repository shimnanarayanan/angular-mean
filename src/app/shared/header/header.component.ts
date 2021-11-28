import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { GeneralService } from 'src/app/core/services/general.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchKey: any = '';
  // cartInfo: any;
  totalQuantity: number = 0;
  constructor(
    private router:Router,
    private generalService:GeneralService
  ) { }

  ngOnInit(): void {
    // this.cartList()
  }

//   cartList(): any {
//     let cartApi = environment.apiURL + 'api/customer/cart/list';
//    if (localStorage.getItem('DFO_apiID') != null && localStorage.getItem('dfo_auth_token')==null) {
//      cartApi = cartApi + '?apiId=' + localStorage.getItem('DFO_apiID');
//    }
//    this.generalService.listData(cartApi).subscribe(
//      (res: any) => {
//       if (this.cartInfo.cartItems?.length > 0) {
//         let quantity = 0;
//         this.cartInfo.cartItems.forEach((element: any) => {
//           quantity = quantity + element.quantity;
//         });
//         this.totalQuantity = quantity;
//       }
//      },
//      (err: HttpErrorResponse) => {
//        // this.toastr.error(err.error.message);
//      }
//    );
    
//  }

  searchNow() {
    
    if (this.searchKey != '') {
      console.log("hh")
      this.router.navigate(['/search', this.searchKey]);
    }
  }

}
