import { Injectable } from '@angular/core';
import {FbiService} from "./fbi.service";
import {pageTypes} from "../types/page-types";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChooseElementService {

  page: pageTypes = 'originalPage'

  criminalData$ = new BehaviorSubject<any>(null) // FOR ADDITIONAL INFO UPDATE IN NgOnInit ORIGINAL PAGE
  editedCriminalData$ = new BehaviorSubject<any>(null) // FOR ADDITIONAL INFO UPDATE IN NgOnInit EDITED PAGE

  constructor(
    private fbiService: FbiService
  ) {
  }

  // For original elements

  // chooseElement(criminal: any): void {
  //   let elementIndex = this.fbiService.editedPosts.findIndex((element: any) => element['@id'] === criminal['@id'])
  //   if(elementIndex !== -1) {
  //     this.editedCriminal = criminal
  //     this.criminal = criminal
  //     this.editedCriminalData$.next(this.editedCriminal)
  //     this.criminalData$.next(this.criminal)
  //   } else {
  //     this.criminal = criminal
  //     this.criminalData$.next(this.criminal)
  //   }
  // }

  checkElementBelongsToEdited(criminal: any) {
    let elementIndex = this.fbiService.editedPosts.findIndex((element: any) => element['@id'] === criminal['@id'])
    return elementIndex !== -1
  }

}
