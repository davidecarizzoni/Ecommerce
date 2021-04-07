import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/model/product.interface';
import { ProductService } from 'src/app/core/services/product.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  products: any;
  imgPath: string = '../../../assets/images/items/'

  constructor(private prodService: ProductService) { }

  ngOnInit(): void {
    this.getProductList();
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


  search(form:any){
    console.log("Ricerca prodotto per: " + form.value.search)
  }

  addToCart(){

  }

  createStore(){
    let prod1:Product = { marca:'Gucci', modello:'Estate', categoria: 'Felpa', colore:'rosso', imageUrl: '2.PNG',
                          prezzo: 890, quantita:2, taglia: 'L',
                          description:'Questa è la descrizione di prova', shortDescription:'Descrizione corta', car1:'caratteristica 1', car2:'caratteristica 2', car3: 'caratteristica3' }

    this.prodService.addProduct(prod1);
  }


}
