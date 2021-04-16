import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FooterComponent } from './footer/footer.component';
import { GooglePayButtonModule } from '@google-pay/button-angular';



@NgModule({
  declarations: [
    MenuComponent,
    FooterComponent,
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GooglePayButtonModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MenuComponent,
    FooterComponent,
    MDBBootstrapModule,
    GooglePayButtonModule
  ]
})
export class SharedModule { }
