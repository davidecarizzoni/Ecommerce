import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/model/product.interface';
import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/core/services/product/product.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CartService } from 'src/app/core/services/cart/cart.service';


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  user:any;
  products: any;

  constructor(private prodService: ProductService, private auth: AuthService, private cart:CartService) { }

  ngOnInit(): void {
    this.getProductList();
    this.auth.getUserState().subscribe((user:any) => {
      this.user = user;
    })
  }

  getProductList() {
    this.prodService.getProductList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(products => {
      this.products = products;
    });
  }

  addToCart(productUid: string){
    this.cart.add(this.user.uid, productUid)
  }


  search(form:any){
    console.log("Ricerca prodotto per: " + form.value.search)
  }

}
