import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();
  authState: any = null;
  newUser: any;

  constructor(private afAuth: AngularFireAuth, private router: Router, private db: AngularFirestore) {
    this.afAuth.authState.subscribe(( auth => {
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
    return this.afAuth.createUserWithEmailAndPassword(email, password).then((user) => {
      this.authState = user;
    }).catch((error) => {
      console.log(error);
      throw error;
    })
  }

  loginWithEmail(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password).then((user) => {
      this.authState = user;
    }).catch((error) => {
      console.log(error);
      throw error;
    })
  }

  signOut(){
    this.afAuth.signOut();
    console.log("Ti sei scollegato! ")
    this.router.navigateByUrl("/login");
  }

  createUser(user: any){
    this.afAuth.createUserWithEmailAndPassword(user.email, user.password).then((userCredential) => {
      this.newUser = user;
      console.log(userCredential);
      userCredential.user?.updateProfile({
        displayName: user.firstName + ' ' + user.lastName
      });

      this.insertUserData(userCredential).then(()=>{
        this.router.navigate(['/userinfo'])
      });
    }).catch((error) => {
      this.eventAuthError.next(error);
    })
  }

  insertUserData(userCredential: any){
    return this.db.doc(`Users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      firstname: this.newUser.firstName,
      lastname: this.newUser.lastName,
      role: 'network user'
    })
  }

}
