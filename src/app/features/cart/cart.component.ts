import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/core/services/product/product.service';
import { Product } from 'src/app/core/model/product.interface';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart:any;
  carts: any;

  products: any;
  product: any;

  list!: Product[];

  constructor(private cartService: CartService, private productService: ProductService) { }

  async ngOnInit(): Promise<void> {
   (await this.cartService.getCart((String)(localStorage.getItem('userUid')))).subscribe(ref => {
    if(!ref.exists){
      console.log("No document exist - da gestire")
    }else{
      this.cart = ref.data();
      if(this.cart!=undefined){
        console.log(this.cart.productList)
      }
    }
  });
  }

  getCart() {
    this.cartService.getCartList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(carts => {
      this.carts = carts;
      this.cart = carts.find(x=>x.key == localStorage.getItem('userUid'))
      console.log(this.cart.productList)
    });
  }

  getProductList(){
    this.productService.getProductList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(products => {
      this.products = products;
    });
  }

}
