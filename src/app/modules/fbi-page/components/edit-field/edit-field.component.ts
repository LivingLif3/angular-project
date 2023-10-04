import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AdditionalFieldsService} from "../../../../core/services/additional-fields.service";

@Component({
  selector: 'app-edit-field',
  templateUrl: './edit-field.component.html',
  styleUrls: ['./edit-field.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditFieldComponent {

  @Input() editStatus?: boolean
  @Output() editStatusChange = new EventEmitter()

  @Input() fieldInfo: any
  @Output() fieldInfoChange = new EventEmitter()

  @Input() additionalFields: any
  @Output() additionalFieldsChange = new EventEmitter()

  constructor(
    public fieldsService: AdditionalFieldsService
  ) {
  }

  editField(value: any) {
    console.log(value, "EDIT ADD FIELD")
    this.additionalFieldsChange.emit(
      this.fieldsService.addField(this.additionalFields, {
          name: value.key,
          value: value.value
        },
        value.type)
    )
    this.fieldInfoChange.emit({
      key: value.key,
      value: {
        value: value.value,
        type: value.type
      }
    })
    this.editStatusChange.emit(false)
  }
}
