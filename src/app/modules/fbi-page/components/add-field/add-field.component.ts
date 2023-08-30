import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {AdditionalFieldsService} from "../../../../../core/services/additional-fields.service";

@Component({
  selector: 'app-add-field',
  templateUrl: './add-field.component.html',
  styleUrls: ['./add-field.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddFieldComponent {

  validateError: boolean = false
  selectValue: string = 'string'

  types: string[] = [
    "string",
    "number",
    "boolean",
    "date"
  ]

  @Input() value: any = ""
  @Output() valueChange = new EventEmitter()

  @Input() name: string = ""
  @Output() nameChange = new EventEmitter()

  @Input() type: string = "string"
  @Output() typeChange = new EventEmitter()

  constructor(
    public fieldsService: AdditionalFieldsService
  ) {
  }

  changeInput(event: any) {
    if (!this.getErrorStatus()) {
      this.validateError = this.getErrorStatus()
      if (event.checked !== undefined) {
        this.valueChange.emit(event.checked)
      } else {
        if (this.type === "date") {
          this.valueChange.emit(event.value)
        } else {
          this.valueChange.emit(event.target.value)
        }
      }
    } else {
      this.validateError = true
    }
  }

  changeName(event: any) {
    this.nameChange.emit(event.target.value)
  }

  getErrorStatus(): boolean {
    if (this.type === typeof this.value) {
      return false
    } else if (this.type === 'date') { // && this.isValidDate(this.value)
      return false
    } else {
      return true
    }
  }

  isValidDate(dateString: string) {
    return !isNaN(Date.parse(dateString));
  }

  changeSelect() {
    if (this.type === 'string') {
      this.value = ''
      this.typeChange.emit(this.type)
    } else if (this.type === 'number') {
      this.value = 0
      this.typeChange.emit(this.type)
    } else if (this.type === 'boolean') {
      this.value = false
      this.typeChange.emit(this.type)
    } else {
      this.value = ""
      this.typeChange.emit(this.type)
    }
  }

  addField() {
    this.fieldsService.addField({
        name: this.name,
        value: this.value
      },
      this.type)
    this.nameChange.emit("")
    this.valueChange.emit("")
    this.typeChange.emit("string")
  }

}
