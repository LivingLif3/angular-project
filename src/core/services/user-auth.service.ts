import {Injectable, Optional} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {IUser} from "../interfaces/user-interface";
import {user} from "@angular/fire/auth";
import {fadeInLegacyItems} from "@angular/material/legacy-menu";
import {collection, collectionData, Firestore} from "@angular/fire/firestore";
import {finalize, first} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  userData: any;
  renderUserData: any;
  isAuth: boolean = false
  error: any
  loadingUserData: boolean = false

  constructor(
    public afAuth: AngularFireAuth,
    public firestore: Firestore
  ) {
    this.afAuth.authState.subscribe((user) => {
      if(user) {
        this.isAuth = true
        console.log(this.isAuth)
        let userDataTemp: any = user.multiFactor
        this.userData = userDataTemp.user
        localStorage.setItem('user', JSON.stringify(this.userData))
        JSON.parse(localStorage.getItem('user')!)
      } else {
        this.isAuth = false
        this.userData = null
        localStorage.removeItem('user')
        JSON.parse(localStorage.getItem('user')!)
      }
    })
  }

  signIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        if(user) {
          this.isAuth = true
          let userDataTemp: any = user.user?.multiFactor
          this.userData = userDataTemp.user
          console.log(this.userData, 'sign in')
          localStorage.setItem('user', JSON.stringify(this.userData))
          return this.userData
        }
      })
      .catch(e => {
        this.isAuth = false
        this.userData = null
        localStorage.removeItem('user')
        return null
      })
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      this.isAuth = false
      this.userData = null
      localStorage.removeItem('user')
    })
  }

  getUserRenderData() {
    this.loadingUserData = true
    const collectionInstance = collection(this.firestore, 'users')
    collectionData(collectionInstance).subscribe(v => {
      this.renderUserData = v.find(user => user['email'] === this.userData.email)
      this.loadingUserData = false
    })
  }

  // setUserData(user: any) {
  //   const userRef: AngularFirestoreDocument<any> = this.afs.doc(
  //     `users/${user.id}`
  //   )
  //
  //   const userData: IUser = {
  //     id: user.id,
  //     email: user.email
  //   }
  //
  //   return userRef.set(userData, {
  //     merge: true
  //   })
  // }
}
