import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection  } from '@angular/fire/firestore';
import { Product } from '../model/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFirestore){}

  getProductList():Observable<any[]>{
    return this.db.collection('products').snapshotChanges();
  }

  addProduct(payload: Product){
    return this.db.collection('products').add(payload);
  }

  updateProduct(productId:string, payload: Product){
    return this.db.doc('products' + productId).update(payload);
  }

  deleteProduct(productId:string){
    return this.db.doc('products' + productId).delete();
  }


}
