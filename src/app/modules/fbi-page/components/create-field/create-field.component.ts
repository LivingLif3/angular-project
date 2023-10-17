import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IAdditionalFields, IAdditionalFieldsInfo} from "../../../../core/interfaces/additional-fileds";
import {ICriminalInfo} from "../../../../core/interfaces/criminal-info";

@Component({
  selector: 'app-create-field',
  templateUrl: './create-field.component.html',
  styleUrls: ['./create-field.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateFieldComponent implements OnInit{

  addStatusForm: boolean = false


  @Input() criminalInfo!: Partial<ICriminalInfo>
  @Input() additionalFields!: IAdditionalFields
  // @Output() additionalFieldsChange = new EventEmitter()

  @Output() onAdd = new EventEmitter()
  @Output() onDelete = new EventEmitter()

  ngOnInit() {
    this.additionalFields = {...this.additionalFields, ...this.criminalInfo?.added_fields}
  }

  addFieldEvent(value: IAdditionalFieldsInfo) {
    this.onAdd.emit(value)
    this.addStatusForm = false
  }

  deleteFieldEvent(element: any) {
    console.log(element)
    this.onDelete.emit(element)
  }

}
