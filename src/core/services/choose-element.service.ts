import { Injectable } from '@angular/core';
import {FbiService} from "./fbi.service";

@Injectable({
  providedIn: 'root'
})
export class ChooseElementService {

  chosenElement: number = 0
  chosenEditedElement: number = 0

  constructor(
    private fbiService: FbiService
  ) {

  }

  // For original elements

  chooseElement(index: number, pageIndex: number, itemsPerPage: number): number {
    this.chosenElement = pageIndex * itemsPerPage + index
    let elementIndex = this.fbiService.editedPosts.findIndex((element: any) => element['@id'] === this.fbiService.criminals[this.chosenElement]['@id'])
    console.log(this.fbiService.editedPosts)
    console.log(elementIndex)
    if(elementIndex !== -1) {
      this.chosenEditedElement = elementIndex
    }
    return this.chosenElement
  }

  // For edited elements

  chooseEditedElement(index: number, pageIndex: number, itemsPerPage: number) {
    this.chosenEditedElement = pageIndex * itemsPerPage + index
    return this.chosenEditedElement
  }

}
