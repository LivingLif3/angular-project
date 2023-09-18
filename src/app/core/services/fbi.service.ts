import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, from, map, Observable} from "rxjs";
import {
  addDoc,
  collection,
  collectionData,
  doc,
  Firestore,
  getDocs,
  query,
  updateDoc,
  where
} from "@angular/fire/firestore";
import {DatabaseReference} from "@angular/fire/compat/database/interfaces";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class FbiService {

  criminals: any = []
  editedPosts: any = []

  constructor(
    public http: HttpClient,
    public firestore: Firestore,
    private db: AngularFirestore
  ) {

  }

  getPeople(): Observable<any> {
    console.log('here')
    return this.http.get('https://api.fbi.gov/wanted/v1/list')
  }

  getPeopleByPage(page: number): Observable<any> {
    return this.http.get('https://api.fbi.gov/wanted/v1/list', {
      params: new HttpParams().set('page', page)
    })
  }

  addEditedPost(post: any): Observable<any> {
      const collectionInstance = collection(this.firestore, 'posts')
      return from(addDoc(collectionInstance, {...post, edited: true}))
  }

  getEditedPosts(pageIndex: number = 0, itemsPerPage: number = 4): Observable<any> {
    const collectionInstance = collection(this.firestore, 'posts')
    return collectionData(collectionInstance).pipe(map((editedPosts: any) => {
      this.editedPosts = editedPosts
      console.log(this.editedPosts)
      return editedPosts.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
    }))
  }

  getEditPostById(id: string) {
    return this.db.collection('posts', ref => ref.where('@id', '==', id)).valueChanges().pipe(
      map(dataArray => {
        if(dataArray.length) {
          return dataArray[0]
        } else {
          return null
        }
      })
    )
  }
}
