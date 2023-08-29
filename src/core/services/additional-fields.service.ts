import { Injectable } from '@angular/core';
import {IField} from "../interfaces/additional-fileds";

@Injectable({
  providedIn: 'root'
})
export class AdditionalFieldsService {

  id: number = 0

  additionalFields: any = {

  }

  addField(field: IField, type: string) {
    console.log(field)
    // let fieldWithId = {...field, id: this.id}
    this.additionalFields[field.name] = {
      value: field.value,
      type
    }
    console.log(this.additionalFields)
    // this.id += 1
  }

  removeField(name: number) {
    delete this.additionalFields[name]
  }

  clearFields() {
    this.additionalFields = {}
  }

}
