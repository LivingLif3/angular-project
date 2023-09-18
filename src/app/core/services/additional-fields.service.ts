import {Injectable} from '@angular/core';
import {IField} from "../interfaces/additional-fileds";

@Injectable({
  providedIn: 'root'
})
export class AdditionalFieldsService {

  id: number = 0

  addField(additionalFields: any, field: IField, type: string) {
    return {
      ...additionalFields, [field.name]: {
        value: field.value,
        type
      }
    }
  }

  removeField(additionalFields: any, name: string) {
    let {[name]: nameOfField, ...otherObj} = additionalFields
    return otherObj
  }

  clearFields() {
    return {}
  }

}
