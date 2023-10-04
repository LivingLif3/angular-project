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

@Component({
  selector: 'app-added-field-info',
  templateUrl: './added-field-info.component.html',
  styleUrls: ['./added-field-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddedFieldInfoComponent implements OnInit {

  color: string = '#32CD32'

  editStatus: boolean = false

  @Input() additionalFields: any
  @Output() additionalFieldsChange = new EventEmitter()

  @Input() fieldInfo!: any

  constructor(
    public additionalService: AdditionalFieldsService
  ) {
  }

  ngOnInit() {
    console.log(this.fieldInfo)
  }

  onDelete() {
    this.additionalFieldsChange.emit(this.additionalService.removeField(this.additionalFields, this.fieldInfo.key))
  }

  onEdit() {
    this.editStatus = true
  }

}
