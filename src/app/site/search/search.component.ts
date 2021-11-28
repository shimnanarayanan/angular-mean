import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/core/services/general.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchKey:any='';
  searchList:any[] = [];
  currentLanguage: string = '';
  dataLoaded: boolean = false;
  breadcrumb:any[]=[];
  constructor(
    private generalService: GeneralService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
   

    this.route.paramMap.subscribe((params) => {
      this.searchKey = params.get('key');
      this.getSerchItems();
    });

  }

  ngOnInit(): void {
    
  }

  getSerchItems() {
    
    let api = environment.apiURL + 'api/customer/products/search/all?key='+this.searchKey;
    this.generalService.listData(api).subscribe(
      (res: any) => {
        this.searchList = res.data;
        this.dataLoaded=true;
        // this.loader.hide();
      },
      (err: HttpErrorResponse) => {
        //this.toastr.error(err.error.message[this.currentLanguage]);
        // this.loader.hide();
      }
    );
  }

  searchNow(){
    this.router.navigate(['/search',this.searchKey]);
  }

}
