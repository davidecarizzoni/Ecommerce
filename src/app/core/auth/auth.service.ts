import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null;

  constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
    this.angularFireAuth.authState.subscribe(( auth => {
      this.authState = auth;
    }))
  }

  registerWithEmail(email: string, password: string){
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password).then((user) => {
      this.authState = user;
    }).catch((error) => {
      console.log(error);
      throw error;
    })
  }

  doRegister(email: string, password: string){
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.createUserWithEmailAndPassword(email,password)
      .then((res:any) => {
        resolve(res);
      }, (err:any) => reject(err))
    })
  }

}
