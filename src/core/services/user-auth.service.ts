import {Injectable, Optional} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {collection, collectionData, Firestore} from "@angular/fire/firestore";
import {BehaviorSubject} from "rxjs";

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
    const progress$ = new BehaviorSubject<boolean>(this.loadingUserData)
    this.loadingUserData = true
    progress$.next(this.loadingUserData)
    const collectionInstance = collection(this.firestore, 'users')
    collectionData(collectionInstance).subscribe(v => {
      this.renderUserData = v.find(user => user['email'] === this.userData.email)
      this.loadingUserData = false
      progress$.next(this.loadingUserData)
      progress$.complete()
    })

    return progress$
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
