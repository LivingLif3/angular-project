import { Injectable } from '@angular/core';
import {FbiService} from "./fbi.service";
import {pageTypes} from "../types/page-types";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChooseElementService {

  page: pageTypes = 'originalPage'

  criminal: any = this.fbiService.criminals[0]
  editedCriminal: any = this.fbiService.editedPosts[0]

  criminalData$ = new BehaviorSubject<any>({}) // FOR ADDITIONAL INFO UPDATE IN NgOnInit ORIGINAL PAGE
  editedCriminalData$ = new BehaviorSubject<any>({}) // FOR ADDITIONAL INFO UPDATE IN NgOnInit EDITED PAGE

  constructor(
    private fbiService: FbiService
  ) {
  }

  // For original elements

  chooseElement(criminal: any): void {
    let elementIndex = this.fbiService.editedPosts.findIndex((element: any) => element['@id'] === criminal['@id'])
    if(elementIndex !== -1) {
      this.editedCriminal = criminal
      this.editedCriminalData$.next(this.editedCriminal)
    } else {
      this.criminal = criminal
      this.criminalData$.next(this.criminal)
    }
  }

  // For edited elements

  chooseEditedElement(criminal: any) {
    this.editedCriminal = criminal
    this.editedCriminalData$.next(this.editedCriminal)
  }

}
