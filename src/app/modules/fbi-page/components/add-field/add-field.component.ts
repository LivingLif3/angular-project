import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AdditionalFieldsService} from "../../../../core/services/additional-fields.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-field',
  templateUrl: './add-field.component.html',
  styleUrls: ['./add-field.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddFieldComponent {
  @Input() additionalFields: any
  @Output() additionalFieldsChange = new EventEmitter()

  constructor(
    public fieldsService: AdditionalFieldsService
  ) {
  }

  addField(value: any) {
    console.log(value, "TEST ADD FIELD")
    this.additionalFieldsChange.emit(
      this.fieldsService.addField(this.additionalFields, {
          name: value.key,
          value: value.value
        },
        value.type)
    )
  }

}
