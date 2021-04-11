import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/core/model/product.interface';
import { map } from 'rxjs/operators';
import { ProductService } from 'src/app/core/services/product/product.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  products: any;
  product!: any;
  uid!: string;

  constructor(private prodService: ProductService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProduct();
  }

  catchUid(){
    this.activatedRoute.paramMap.subscribe( params => {
      this.uid = String(params.get('uid'));
    })
  }

  getProduct() {
    this.catchUid();
    this.prodService.getProductList().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(products => {
      this.products = products;
      this.product = products.find(x=>x.key == this.uid)
    });
  }
}
