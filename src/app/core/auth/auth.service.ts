import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

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

  get isUserAnonymousLoggedIn(): boolean {
    return (this.authState !== null) ? this.authState.isAnonymous: false ;
  }

  get currentUserId(): string {
    return (this.authState !== null) ? this.authState.uid : "" ;
  }

  get currentUserName(): string {    //implements displayname?
    return this.authState["email"];
  }

  get currentUser(): any {
    return (this.authState !== null) ? this.authState : false ;
  }

  get isUserEmailLoggedIn() : boolean {
    return ((this.authState !== null) && (!this.isUserAnonymousLoggedIn)) ? true : false;
    //se c'è errore tolgo operatore binario
  }

  registerWithEmail(email: string, password: string){
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password).then((user) => {
      this.authState = user;
    }).catch((error) => {
      console.log(error);
      throw error;
    })
  }

  loginWithEmail(email: string, password: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password).then((user) => {
      this.authState = user;
    }).catch((error) => {
      console.log(error);
      throw error;
    })
  }

  signOut(){
    this.angularFireAuth.signOut();
    console.log("Ti sei scollegato! ")
    this.router.navigateByUrl("/login");
  }

}
