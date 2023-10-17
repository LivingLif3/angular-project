import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import {AdditionalFieldsService} from "../../../../core/services/additional-fields.service";
import {IAdditionalFields, IAdditionalFieldsInfo} from "../../../../core/interfaces/additional-fileds";

@Component({
  selector: 'app-added-field-info',
  templateUrl: './added-field-info.component.html',
  styleUrls: ['./added-field-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddedFieldInfoComponent {

  color: string = '#32CD32'

  editStatus: boolean = false

  // @Input() additionalFields: any
  // @Output() additionalFieldsChange = new EventEmitter()
  @Output() onAdd = new EventEmitter()
  @Output() onDelete = new EventEmitter()

  @Input() fieldInfo!: any

  onAddField(value: IAdditionalFieldsInfo) {
    this.onAdd.emit(value)
  }

  onDeleteField() {
    this.onDelete.emit()
  }

  onEdit() {
    this.editStatus = true
  }

}
