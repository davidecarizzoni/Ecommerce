import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserinfoRoutingModule } from './userinfo-routing.module';
import { UserinfoComponent } from './userinfo.component';


@NgModule({
  declarations: [UserinfoComponent],
  imports: [
    CommonModule,
    UserinfoRoutingModule
  ]
})
export class UserinfoModule { }
