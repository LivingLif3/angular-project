import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, from, Observable} from "rxjs";
import {addDoc, collection, collectionData, doc, Firestore, updateDoc} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class FbiService {

  criminals: any = []
  editedPosts: any = []

  constructor(
    public http: HttpClient,
    public firestore: Firestore) { }

  getPeople(): Observable<any> {
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

  getEditedPosts(): Observable<any> {
    const collectionInstance = collection(this.firestore, 'posts')

    return collectionData(collectionInstance)
  }

  updateAddedFields(id: string, fields: any) {
    const docInstance = doc(this.firestore, 'posts', id)
    const updateData = {
      added_fields: fields
    }

    updateDoc(docInstance, updateData).then(
      () => {
        console.log("DATA UPDATED")
      }
    ).catch(err => {
      console.log(err)
    })
  }
}
