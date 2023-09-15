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
  isAuth: boolean = false
  error: any
  userData$ = new BehaviorSubject<any>(null)

  constructor(
    public afAuth: AngularFireAuth,
    public firestore: Firestore,
    private router: Router
  ) {}

  signIn(email: string, password: string) {
    return from(this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        if(user) {
          this.isAuth = true
          let userDataTemp: any = user.user?.multiFactor
          this.userData = userDataTemp.user
          this.userData$.next(this.userData)
          localStorage.setItem('user', JSON.stringify(this.userData))
          this.router.navigate(['/fbi'])
          return this.userData
        }
      })
      .catch(e => {
        this.isAuth = false
        this.userData = null
        this.userData$.next(null)
        localStorage.removeItem('user')
        return null
      }))
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      this.isAuth = false
      this.userData = null
      this.userData$.next(null)
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
