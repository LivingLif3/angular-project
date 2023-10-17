import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter, Inject,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AdditionalFieldsService} from "../../../../core/services/additional-fields.service";
import {ChooseElementService} from "../../../../core/services/choose-element.service";
import {FbiService} from "../../../../core/services/fbi.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ICriminalInfo} from "../../../../core/interfaces/criminal-info";
import {
  IAdditionalFields,
  IAdditionalFieldsFull,
  IAdditionalFieldsInfo
} from "../../../../core/interfaces/additional-fileds";

@Component({
  selector: 'app-edit-post-modal',
  templateUrl: './edit-post-modal.component.html',
  styleUrls: ['./edit-post-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPostModalComponent implements OnInit {

  @Input() initialValue!: Partial<ICriminalInfo>

  @Output() onEdit = new EventEmitter()

  // criminal: any
  additionalFields: any = {}

  editFormGroup: FormGroup = this.fb.group({
    title: [''],
    age_range: [''],
    sex: [''],
    weight: [''],
    race_raw: [''],
    nationality: [''],
    hair_raw: [''],
    eyes: [''],
    reward_text: [''],
    description: ['']
  })

  constructor(
    private fb: FormBuilder,
    private fieldsService: AdditionalFieldsService
  ) {
  }

  ngOnInit() {
    this.editFormGroup.patchValue(this.initialValue)
  }

  // Нужно здесь заэмитить значение на false
  filterNumericInput(value: string) {
    const filteredValue = value.replace(/[^0-9]/g, '');
    this.editFormGroup.get('age_range')!.setValue(filteredValue, { emitEvent: false });
  }

  edit() {
    this.onEdit.emit([
      this.editFormGroup.value,
      this.additionalFields
    ])
  }

  getAdditionalFields(value: IAdditionalFieldsInfo) {
    this.additionalFields = this.fieldsService.addField(this.additionalFields, {
      name: value.key,
      value: value.value
    }, value.type)
  }

  deleteField(element: IAdditionalFields) {
    this.additionalFields = this.fieldsService.removeField(this.additionalFields, element.key)
  }
}
