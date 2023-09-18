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

@Component({
  selector: 'app-edit-post-modal',
  templateUrl: './edit-post-modal.component.html',
  styleUrls: ['./edit-post-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPostModalComponent implements OnInit{

  criminal: any
  additionalFields: any = {}

  additionalFieldInfo = {
    key: "",
    value: "",
    type: "string"
  }

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
    private chooseElementService: ChooseElementService,
    private fbiService: FbiService,
    private editDialogRef: MatDialogRef<EditPostModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
    this.chooseElementService.criminalData$.subscribe(criminal => {
      this.criminal = criminal
    })
    this.editFormGroup.patchValue(this.data.criminal)
  }

  // Нужно здесь заэмитить значение на false
  filterNumericInput(value: any) {
    const filteredValue = value.replace(/[^0-9]/g, '');
    this.editFormGroup.get('age_range')!.setValue(filteredValue, { emitEvent: false });
  }

  edit() {
    let data = {...this.criminal, ...this.editFormGroup.value}

    if(Object.keys(this.additionalFields).length) {
      data.added_fields = this.additionalFields
    } else {
      data.added_fields = null
    }

    this.fbiService.addEditedPost(data)
    this.editDialogRef.close()
  }

  getAdditionalFields(additionalFields: any) {
    this.additionalFields = additionalFields
  }
}
