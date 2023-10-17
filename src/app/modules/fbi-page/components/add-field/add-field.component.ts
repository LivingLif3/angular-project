import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AdditionalFieldsService} from "../../../../core/services/additional-fields.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {IAdditionalFields, IAdditionalFieldsInfo} from "../../../../core/interfaces/additional-fileds";

@Component({
  selector: 'app-add-field',
  templateUrl: './add-field.component.html',
  styleUrls: ['./add-field.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddFieldComponent {
  @Input() additionalFields!: IAdditionalFields

  @Output() onAdd = new EventEmitter()

  addField(value: IAdditionalFieldsInfo) {
    this.onAdd.emit(value)
  }

}
