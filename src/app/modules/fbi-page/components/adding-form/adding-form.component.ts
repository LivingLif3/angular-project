import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {MatSelectChange} from "@angular/material/select";

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

  defaultValues: Record<string, string | number | boolean> = {
    string: "",
    number: 0,
    boolean: false,
    date: ""
  }

  addFieldForm: FormGroup = this.fb.group({
    key: ['', Validators.required],
    value: ['', Validators.required],
    type: ['string']
  })

  @Input() initialValue?: any
  @Output() addFieldEvent = new EventEmitter<typeof this.addFieldForm.value>()
  @Output() onAdd = new EventEmitter()

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

  changeSelect(select: MatSelectChange) {
    this.addFieldForm.patchValue({
      value: this.defaultValues[select.value],
    })
  }

  addField() {
    if(!this.addFieldForm.invalid) {
      this.addFieldEvent.emit(this.addFieldForm.value)
      this.addFieldForm.patchValue({
        key: "",
        value: "",
        type: "string"
      })
    }
  }
}
