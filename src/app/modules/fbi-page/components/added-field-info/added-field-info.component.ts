import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {AdditionalFieldsService} from "../../../../../core/services/additional-fields.service";

@Component({
  selector: 'app-added-field-info',
  templateUrl: './added-field-info.component.html',
  styleUrls: ['./added-field-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddedFieldInfoComponent implements OnInit{

  color: string = '#32CD32'

  @Input() fieldInfo!: any
  @Input() elementType!: any

  @Input() name!: string
  @Output() nameChange = new EventEmitter()

  @Input() value!: string
  @Output() valueChange = new EventEmitter()

  @Input() type!: string
  @Output() typeChange = new EventEmitter()

  constructor(
    public additionalService: AdditionalFieldsService
  ) {
  }

  ngOnInit() {
    console.log(this.elementType, "INSIDE INIT!!!")
    if(this.elementType.type === 'string' || this.elementType.type === 'date') {
      this.color = '#32CD32'
      console.log(this.color)
    } else if(this.elementType.type === 'number') {
      this.color = 'black'
      console.log(this.color)
    } else {
      this.color = '#1E90FF'
      console.log(this.color)
    }
  }

  onDelete() {
    this.additionalService.removeField(this.fieldInfo.key)
  }

  onEdit() {
    this.nameChange.emit(this.fieldInfo.key)
    this.valueChange.emit(this.fieldInfo.value.value)
    this.typeChange.emit(this.fieldInfo.value.type)
    this.onDelete()
  }

}
