import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {collection, collectionData, Firestore} from "@angular/fire/firestore";
import {BehaviorSubject, from, Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  userData: any;
  renderUserData: any;
  isAuth: boolean = false
  error: any
  loadingUserData: boolean = false
  userData$ = new BehaviorSubject<any>({})

  constructor(
    public afAuth: AngularFireAuth,
    public firestore: Firestore,
    private router: Router
  ) {}

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
          this.router.navigate(['/fbi'])
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

  checkAuth(): Observable<any> {
    return this.afAuth.authState
  }

  getAuthUser() {
    return from(this.afAuth.currentUser)
  }

  getUserRenderData() {
    const collectionInstance = collection(this.firestore, 'users')

    return collectionData(collectionInstance)
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
