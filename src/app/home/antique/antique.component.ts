import { Component, OnInit ,Input} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { GeneralService } from 'src/app/core/services/general.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-antique',
  templateUrl: './antique.component.html',
  styleUrls: ['./antique.component.css']
})
export class AntiqueComponent implements OnInit {
 
  featuredServices: any[] = [];
  ImageBaseURL: string =""
  constructor(
    private generalService: GeneralService,
  ) { 
    
  }

  ngOnInit(): void {

    this.getFeaturedServices();
  }
  getFeaturedServices() {
    let apiURL = environment.apiURL + 'api/customer/product';
  
    this.generalService.listData(apiURL).subscribe(
      (res: any) => {
        this.featuredServices = res.data;
        this.ImageBaseURL=environment.apiURL
      },
      (err: HttpErrorResponse) => {
        // this.toastr.error(err.error.message[this.currentLanguage]);
      }
    );
  }

 

}
