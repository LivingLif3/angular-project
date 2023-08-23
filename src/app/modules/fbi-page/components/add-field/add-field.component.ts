import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

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

  changeInput(event: any) {
    if(!this.getErrorStatus()) {
      this.validateError = this.getErrorStatus()
      this.valueChange.emit(event.target.value)
    } else {
      this.validateError = true
    }
  }

  changeName(event: any) {
    this.nameChange.emit(event.target.value)
  }

  getErrorStatus(): boolean {
    if(this.selectValue === typeof this.value) {
      return false
    } else if(this.selectValue === 'date' && this.isValidDate(this.value)) {
      return false
    } else {
      return true
    }
  }

  isValidDate(dateString: string) {
    return !isNaN(Date.parse(dateString));
  }

  changeSelect() {
    if(this.selectValue === 'string') {
      this.value = ''
    } else if(this.selectValue === 'number') {
      this.value = 0
    } else if(this.selectValue === 'boolean') {
      this.value = false
    } else {
      this.value = ""
    }
  }

}
