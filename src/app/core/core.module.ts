import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiInteceptor } from './interceptor/api.interceptor';

import { HTTP_INTERCEPTORS } from '@angular/common/http';


@NgModule({
  declarations: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInteceptor,
      multi: true,
    },
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
