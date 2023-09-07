import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AdditionalFieldsService} from "../../../../../core/services/additional-fields.service";
import {ChooseElementService} from "../../../../../core/services/choose-element.service";
import {FbiService} from "../../../../../core/services/fbi.service";
import {ModalService} from "../../../../../core/services/modal.service";

@Component({
  selector: 'app-edit-post-modal',
  templateUrl: './edit-post-modal.component.html',
  styleUrls: ['./edit-post-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPostModalComponent {

  additionalFieldInfo = {
    key: "",
    value: "",
    type: "string"
  }

  editFormGroup: FormGroup = this.fb.group({ // camelCase
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
    public fieldsService: AdditionalFieldsService,
    private fb: FormBuilder,
    private chooseElementService: ChooseElementService,
    private fbiService: FbiService,
    private modalService: ModalService
  ) {
  }
  // Нужно здесь заэмитить значение на false
  filterNumericInput(event: any) {
    const filteredValue = event.target.value.replace(/[^0-9]/g, '');
    this.editFormGroup.get('age_range')!.setValue(filteredValue, { emitEvent: false });
  }

  edit() {
    let data = {...this.chooseElementService.criminal}

    for (let key in this.editFormGroup.controls) {
      if (this.editFormGroup.get(key)?.value) {
        data[key] = this.editFormGroup.get(key)?.value
      }
    }
    if(Object.keys(this.fieldsService.additionalFields).length) {
      data.added_fields = this.fieldsService.additionalFields
    } else {
      data.added_fields = null
    }
    this.fbiService.addEditedPost(data)
    this.modalService.closeEditModal()
  }
}
