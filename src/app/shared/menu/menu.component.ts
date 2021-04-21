import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CartService } from 'src/app/core/services/cart/cart.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input()
  version:any;

  @Input()
  cartLength:any;

  userUid:any;
  user:any;
  isLog:boolean = false;

  constructor( private authService: AuthService, private router:Router, private cartService: CartService){}

  ngOnInit() {
   this.userUid = localStorage.getItem("userUid");
   this.authService.getUserState().subscribe((user:any) => this.user = user)
   this.cartService.findCartByUserUid(this.userUid).subscribe(cart => this.cartLength = cart.productList.length)
  }

  async isLogged(){
    await this.user ? this.isLog = true: this.isLog = false;
  }

  logout(){
    this.authService.logout();
  }

  goToLogin(){
    this.router.navigateByUrl('/login');
  }

  goToRegister(){
    this.router.navigateByUrl('/register');
  }

  goToStore(){
    this.router.navigateByUrl('/store');
  }

  goToCart(){
    this.router.navigateByUrl('/cart');
  }

}
