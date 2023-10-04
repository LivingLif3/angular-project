import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-adding-form',
  templateUrl: './adding-form.component.html',
  styleUrls: ['./adding-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddingFormComponent implements OnInit {
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

  addFieldForm: FormGroup = this.fb.group({
    key: [''],
    value: [''],
    type: ['string']
  })

  @Input() initialValue?: any
  @Output() addFieldEvent = new EventEmitter<typeof this.addFieldForm.value>()

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    if(this.initialValue) {
      this.addFieldForm.setValue({
        key: this.initialValue.key,
        value: this.initialValue.value.value,
        type: this.initialValue.value.type
      })
    }
  }

  changeSelect() {
    this.addFieldForm.patchValue({
      value: this.defaultValues[this.addFieldForm.get('type')!.value],
    })
  }

  addField() {
    if(Boolean(this.addFieldForm.get('value')!.value) && Boolean(this.addFieldForm.get('key')!.value) && this.addFieldForm.get('type')!.value !== 'boolean') {
      this.addFieldEvent.emit(this.addFieldForm.value)
      this.addFieldForm.patchValue({
        key: "",
        value: "",
        type: "string"
      })
    } else if(this.addFieldForm.get('type')!.value === 'boolean' && Boolean(this.addFieldForm.get('key')!.value)) {
      this.addFieldEvent.emit(this.addFieldForm.value)
      this.addFieldForm.patchValue({
        key: "",
        value: "",
        type: "string"
      })
    }
  }
}
