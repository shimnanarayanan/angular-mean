import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private http: HttpClient) { }

  addData(url: string,data: FormData){
    return this.http.post(url, data);
  }

  listData(url: string){
    return this.http.get(url);
  }

  detailInfo(url: string){
    return this.http.get(url);
  }

  editData(url: string,data: FormData){
    return this.http.put(url, data);
  }

  deleteData(url: string){
    return this.http.delete(url);
  }

  addObjectData(url: string,data: Object){
    return this.http.post(url, data);
  }

  editObjectData(url: string,data: Object){
    return this.http.put(url, data);
  }
  /*----------------- List Iterms-----------------------------*/
}
