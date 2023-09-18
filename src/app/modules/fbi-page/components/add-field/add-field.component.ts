import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {AdditionalFieldsService} from "../../../../core/services/additional-fields.service";

@Component({
  selector: 'app-add-field',
  templateUrl: './add-field.component.html',
  styleUrls: ['./add-field.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddFieldComponent {

  validateError: boolean = false

  types: string[] = [
    "string",
    "number",
    "boolean",
    "date"
  ]

  defaultValues: any = {
    string: "",
    number: 0,
    boolean: false,
    date: ""
  }

  @Input() additionalFieldInfo!: any
  @Output() additionalFieldInfoChange = new EventEmitter()

  @Output() addFieldEvent = new EventEmitter()

  @Input() additionalFields: any
  @Output() additionalFieldsChange = new EventEmitter()

  constructor(
    public fieldsService: AdditionalFieldsService
  ) {
  }

  anotherChangeInput(event: any) {
    this.additionalFieldInfoChange.emit({...this.additionalFieldInfo, value: event})
  }

  changeName(event: any) {
    this.additionalFieldInfoChange.emit({...this.additionalFieldInfo, key: event.target.value})
  }

  changeSelect() {
    this.additionalFieldInfoChange.emit({
      ...this.additionalFieldInfo,
      value: this.defaultValues[this.additionalFieldInfo.type],
      type: this.additionalFieldInfo.type
    })
  }

  addField() {
    if(Boolean(this.additionalFieldInfo.value) && Boolean(this.additionalFieldInfo.key)) {
      this.additionalFieldsChange.emit(
        this.fieldsService.addField(this.additionalFields, {
            name: this.additionalFieldInfo.key,
            value: this.additionalFieldInfo.value
          },
          this.additionalFieldInfo.type)
      )

      this.addFieldEvent.emit()

      this.additionalFieldInfoChange.emit({
        key: "",
        value: "",
        type: "string"
      })
    }
  }

}
