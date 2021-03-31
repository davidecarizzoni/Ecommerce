import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    MenuComponent,
    FooterComponent,
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MenuComponent,
    FooterComponent,
    MDBBootstrapModule
  ]
})
export class SharedModule { }
