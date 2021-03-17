import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { auth } from 'firebase/app';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();
  newUser: any;

  constructor(private afAuth: AngularFireAuth, private router: Router, private db: AngularFirestore) {
    this.afAuth.auth.languageCode='it';
  }

  async loginWithGoogle(){
    await this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((userCredential)=>{
      this.router.navigateByUrl("/home");
    }).catch(error => {
      this.afAuth.auth.languageCode='it';
      this.eventAuthError.next(error);
    })
  }

  loginWithEmail(email: string, password: string ) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(()=>{
      this.router.navigateByUrl("/home");
    }).catch( error => {
      this.afAuth.auth.languageCode='it';

      this.eventAuthError.next(error);
    })
  }

  logout(){
    this.afAuth.auth.signOut();
    this.router.navigateByUrl("/login");
  }

  createUser(user: any){
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then((userCredential) => {
      this.newUser = user;
      console.log(userCredential);
      userCredential.user?.updateProfile({
        displayName: user.firstName + ' ' + user.lastName
      });

      this.insertUserData(userCredential).then(()=>{
        this.router.navigate(['/userinfo'])
      });
    }).catch((error:any) => {
      this.eventAuthError.next(error);
    })
  }


  createUserWithGoogle(){
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((userCredential) => {
      this.newUser = userCredential.user;
      console.log(this.newUser);
      userCredential.user?.updateProfile({
        displayName: userCredential.user.displayName
      });

      this.insertUserData(userCredential).then(()=>{
        this.router.navigate(['/userinfo'])
      });
    }).catch((error:any) => {
      this.eventAuthError.next(error);
    })
  }

  async insertUserData(userCredential: any){
    console.log("INSERT USER DATA" + userCredential)
    await this.db.doc(`Users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      firstname: this.newUser.firstName,
      lastname: this.newUser.lastName,
      role: 'network user'
    })
  }

  getUserState() {
    return this.afAuth.authState;
  }


}
