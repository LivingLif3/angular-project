import {Injectable} from '@angular/core';
import {IField} from "../interfaces/additional-fileds";

@Injectable({
  providedIn: 'root'
})
export class AdditionalFieldsService {

  id: number = 0

  additionalFields: any = {}

  addField(field: IField, type: string) {
    this.additionalFields = {
      ...this.additionalFields, [field.name]: {
        value: field.value,
        type
      }
    }
  }

  removeField(name: string) {
    delete this.additionalFields[name]
    this.additionalFields = {...this.additionalFields}
  }

  clearFields() {
    this.additionalFields = {}
  }

}
