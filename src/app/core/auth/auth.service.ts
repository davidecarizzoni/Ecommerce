import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import * as firebase from 'firebase/app';
import { DatePipe } from '@angular/common'
import { User } from '../model/user.interface';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();
  newUser: any;

  user$!: Observable<any>;


  constructor(private afAuth: AngularFireAuth, private router: Router, private db: AngularFirestore, public datepipe: DatePipe) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    )
  }

  async googleAuth(){
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    this.updateUserData(credential.user);
  }

  async facebookAuth() {
    const provider = new firebase.auth.FacebookAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    this.updateUserData(credential.user);
  }

  private updateUserData(user: any) {
    const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.uid}`);
    const data = {
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      creationTime: this.datepipe.transform(new Date(), 'yyyy-MM-dd H:mm:ss'),
      role: 'network user'
    }

    userRef.set(data, { merge: true }).then(()=>{
      this.router.navigateByUrl("/store");
      localStorage.setItem("userUid", (String)(this.afAuth.auth.currentUser?.uid));
    }).catch(error => {
      this.eventAuthError.next(error);
    })

  }

  async loginWithEmail(email: string, password: string ) {
    await this.afAuth.auth.signInWithEmailAndPassword(email, password).then(()=>{
      this.router.navigateByUrl("/store");
      localStorage.setItem("userUid", (String)(this.afAuth.auth.currentUser?.uid));
    }).catch( error => {
      this.eventAuthError.next(error);
    })
  }

  logout(){
    this.afAuth.auth.signOut();
    localStorage.setItem("userUid", '');
    this.router.navigateByUrl("/login");
  }

  createUser(user: any){
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then((userCredential) => {
      this.newUser = user;
      userCredential.user?.updateProfile({
        displayName: user.firstName + ' ' + user.lastName
      });
      this.insertUserData(userCredential).then(()=>{
        localStorage.setItem("userUid", (String)(this.afAuth.auth.currentUser?.uid));
        this.router.navigateByUrl('/store')
      });
    }).catch((error) => {
      this.eventAuthError.next(error);
    })
  }

  async insertUserData(userCredential: any){
    await this.db.doc(`users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      displayName: this.newUser.firstName + this.newUser.lastName,
      creationTime: this.datepipe.transform(new Date(), 'yyyy-MM-dd H:mm:ss'),
      role: 'network user'
    })
  }

  getUserState() {
    return this.afAuth.authState;
  }


}
