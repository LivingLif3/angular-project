import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {IAdditionalFieldsInfo} from "../../../../core/interfaces/additional-fileds";

@Component({
  selector: 'app-create-field',
  templateUrl: './create-field.component.html',
  styleUrls: ['./create-field.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateFieldComponent {

  additionalFields = {}

  @Input() additionalFieldInfo!: IAdditionalFieldsInfo

  @Output() additionalFieldsChange = new EventEmitter()

  addFieldEvent() {
    this.additionalFieldsChange.emit(this.additionalFields)
  }

}
