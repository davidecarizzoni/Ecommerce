import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/model/product.interface';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  public productList: Product[] = [];
  public productDetail: Product = {id:'', marca:'', modello:'', colore: '', imgaeUrl:'', prezzo: 0, qta: 0 }

  imgPath: string = '../../../assets/product/'

  constructor(private prodService: ProductService) {
  }

  ngOnInit(): void {
    this.getEmployees();
    console.log(this.productList)
  }

  async getEmployees() {
     this.prodService.getProductList().subscribe((res:any) => {
       console.log(res);
       this.productList = res.map((product:any) => {
         console.log(this.productList);
        return {
          ...product.payload.doc.data(),
          id: product.payload.doc.id
        } as Product;
      });
    });
  }


  // createStore(){
  //   let prod1:Product = {id:'1', marca:'Apple', modello:'Iphone SE', colore: 'Nero', imgaeUrl: this.imgPath +'iphoneSE_nero.PNG', prezzo: 499, qta:6 }
  //   let prod2:Product = {id:'2', marca:'Apple', modello:'Iphone SE', colore: 'Bianco', imgaeUrl: this.imgPath +'iphoneSE_bianco.PNG', prezzo: 499, qta:10 }
  //   let prod3:Product = {id:'3', marca:'Apple', modello:'Iphone SE', colore: 'Rosso', imgaeUrl: this.imgPath + 'iphoneSE_rosso.PNG', prezzo: 499, qta:10 }

  //   this.prodService.addProduct(prod1)
  //   this.prodService.addProduct(prod2)
  //   this.prodService.addProduct(prod3)
  // }

}
