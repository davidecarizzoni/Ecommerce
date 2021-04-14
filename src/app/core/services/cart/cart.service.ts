import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Cart } from '../../model/cart.interface';
import { firestore } from 'firebase';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { convertSnaps } from '../db-utils';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartRef!: AngularFirestoreCollection<Cart>;

  constructor(private db: AngularFirestore){
    this.cartRef = this.db.collection('/carts');
  }

  async add(userUid:string, productUid:string){
    await this.cartRef.doc(userUid).set({
      userUid: userUid,
      productList: firestore.FieldValue.arrayUnion(productUid),
    },{merge: true} )
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
  }

  async remove(userUid:string, productUid:string){
    await this.cartRef.doc(userUid).set({
      userUid: userUid,
      productList: firestore.FieldValue.arrayRemove(productUid),
    },{merge: true} )
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
  }

  getCartList(): AngularFirestoreCollection<Cart>{
    return this.cartRef;
  }

  getCart(uid: string): Observable<Cart> {
    return this.db.doc(`carts/${uid}`)
    .snapshotChanges()
      .pipe(
          map((snaps) => {
            let carts = convertSnaps<Cart>(snaps)
            return carts[0];
          }),
          first()
        )
  }

  findCartByUserUid(userUid: string): Observable<Cart> {
    return this.db.collection('carts', ref=> ref.where("userUid", "==", userUid))
      .snapshotChanges()
      .pipe(
          map((snaps) => {
            let carts = convertSnaps<Cart>(snaps)
            return carts[0];
          }),
          first()
        )
  }




}
