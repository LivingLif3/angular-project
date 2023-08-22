import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {addDoc, collection, collectionData, Firestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class FbiService {

  loadingPostsData: boolean = false
  editedPosts: any = []

  constructor(
    public http: HttpClient,
    public firestore: Firestore) { }

  getPeopleByPage(page: number): Observable<any> {
    return this.http.get('https://api.fbi.gov/wanted/v1/list', {
      params: new HttpParams().set('page', page)
    })
  }

  addEditedPost(post: any) {
      const collectionInstance = collection(this.firestore, 'posts')
      addDoc(collectionInstance, post).then(() => {
        console.log('DATA ADD SUCCESSFULLY')
      })
  }

  getEditedPosts() {
    console.log("HERE")
    const progress$ = new BehaviorSubject<boolean>(this.loadingPostsData)
    this.loadingPostsData = true
    progress$.next(this.loadingPostsData)
    const collectionInstance = collection(this.firestore, 'posts')
    collectionData(collectionInstance).subscribe(v => {
      this.editedPosts = v
      console.log(this.editedPosts)
      this.loadingPostsData = false
      progress$.next(this.loadingPostsData)
      progress$.complete()
    })

    return progress$
  }
}
