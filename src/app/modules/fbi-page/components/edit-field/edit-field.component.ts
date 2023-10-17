import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AdditionalFieldsService} from "../../../../core/services/additional-fields.service";
import {IAdditionalFields, IAdditionalFieldsInfo} from "../../../../core/interfaces/additional-fileds";

@Component({
  selector: 'app-edit-field',
  templateUrl: './edit-field.component.html',
  styleUrls: ['./edit-field.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditFieldComponent {

  @Input() editStatus?: boolean
  @Output() editStatusChange = new EventEmitter()

  @Input() fieldInfo!: IAdditionalFields
  @Output() onAdd = new EventEmitter()

  editField(value: IAdditionalFieldsInfo) {
    this.onAdd.emit(value)
    this.editStatusChange.emit(false)
  }
}
