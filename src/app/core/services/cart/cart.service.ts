import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Cart } from '../../model/cart.interface';
import { firestore } from 'firebase';



@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartRef!: AngularFirestoreCollection<Cart>;

  constructor(private db: AngularFirestore){
    this.cartRef = this.db.collection('/Carts');
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

  async getCart(uid: string){
    return this.db.doc(`Carts/${uid}`).get();
  }



}
