import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {AdditionalFieldsService} from "../../../../core/services/additional-fields.service";

@Component({
  selector: 'app-added-field-info',
  templateUrl: './added-field-info.component.html',
  styleUrls: ['./added-field-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddedFieldInfoComponent {

  color: string = '#32CD32'

  @Input() additionalFieldInfo!: any
  @Output() additionalFieldInfoChange = new EventEmitter()

  @Input() additionalFields: any
  @Output() additionalFieldsChange = new EventEmitter()

  @Input() fieldInfo!: any
  @Input() elementType!: any

  constructor(
    public additionalService: AdditionalFieldsService
  ) {
  }

  onDelete() {
    this.additionalFieldsChange.emit(this.additionalService.removeField(this.additionalFields, this.fieldInfo.key))
  }

  onEdit() {
    this.additionalFieldInfoChange.emit(
      {
        key: this.fieldInfo.key,
        value: this.fieldInfo.value.value,
        type: this.fieldInfo.value.type
      }
    )
    this.onDelete()
  }

}
