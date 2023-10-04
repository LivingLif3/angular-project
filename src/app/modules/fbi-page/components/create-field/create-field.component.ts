import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IAdditionalFieldsInfo} from "../../../../core/interfaces/additional-fileds";

@Component({
  selector: 'app-create-field',
  templateUrl: './create-field.component.html',
  styleUrls: ['./create-field.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateFieldComponent implements OnInit{

  addStatusForm: boolean = false
  additionalFields = {}

  @Input() criminalInfo!: any
  @Output() additionalFieldsChange = new EventEmitter()

  ngOnInit() {
    this.additionalFields = {...this.additionalFields, ...this.criminalInfo?.added_fields}
  }

  addFieldEvent(additionalFields: any) {
    this.additionalFields = additionalFields
    this.additionalFieldsChange.emit(this.additionalFields)
    this.addStatusForm = false
  }

}
