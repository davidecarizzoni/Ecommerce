import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Product } from '../model/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productRef!: AngularFirestoreCollection<Product>;

  constructor(private db: AngularFirestore){
    this.productRef = db.collection('/Products');
  }

  getProductList(): AngularFirestoreCollection<Product>{
    return this.productRef;
  }

  addProduct(payload: Product){
    return this.productRef.add(payload);
  }

  updateProduct(uid:string, payload: Product){
    return this.db.doc('Products' + uid).update(payload);
  }

  deleteProduct(uid:string){
    return this.db.doc('Products' + uid).delete();
  }


}
