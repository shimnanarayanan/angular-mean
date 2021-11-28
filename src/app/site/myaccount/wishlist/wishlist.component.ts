import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { GeneralService } from 'src/app/core/services/general.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  wishList:any[]=[];
  constructor(
    private generalService: GeneralService,
    private router: Router,
    private  toastr:ToastrModule
  ) {
    
  }


  ngOnInit(): void {
    this.getWishList();
  }


  getWishList() {
    let api = environment.apiURL + 'api/customer/product/favorite/list';
    this.generalService.listData(api).subscribe(
      (res: any) => {
        this.wishList = res.data;
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  addToWishlist(product: any) {
    //this.productService.addToWishlist(product);
    if (localStorage.getItem('dfo_auth_token') == null) {
      this.router.navigate(['/login']);
    }
    let favApi = environment.apiURL + 'api/customer/product/favorite';

    let data: any = {
      antique: product._id,
    };

    this.generalService.addObjectData(favApi, data).subscribe(
      (res: any) => {
        
        const removeIndex = this.wishList.findIndex( item => item.id === product._id );
        this.wishList.splice( removeIndex, 1 );
        // this.toastr.success(res.message);
      },
      (err: HttpErrorResponse) => {
        
      }
    );
  }


  public openDashboard: boolean = false;
  ToggleDashboard() {
    this.openDashboard = !this.openDashboard;
  }

}
