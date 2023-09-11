import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AdditionalFieldsService} from "../../../../core/services/additional-fields.service";
import {ChooseElementService} from "../../../../core/services/choose-element.service";
import {FbiService} from "../../../../core/services/fbi.service";
import {ModalService} from "../../../../core/services/modal.service";

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
    ageRange: [''],
    sex: [''],
    weight: [''],
    raceRaw: [''],
    nationality: [''],
    hairRaw: [''],
    eyes: [''],
    rewardText: [''],
    description: ['']
  })

  inputFieldsResposibilities: any = {
    title: 'title',
    ageRange: 'age_range',
    sex: 'sex',
    weight: 'weight',
    raceRaw: 'race_raw',
    nationality: 'nationality',
    hairRaw: 'hair_raw',
    eyes: 'eyes',
    rewardText: 'reward_text',
    description: 'description'
  }

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
    this.editFormGroup.get('ageRange')!.setValue(filteredValue, { emitEvent: false });
  }

  edit() {
    let data = {...this.chooseElementService.criminal}

    for (let key in this.editFormGroup.controls) {
      if (this.editFormGroup.get(key)?.value) {
        data[this.inputFieldsResposibilities[key]] = this.editFormGroup.get(key)?.value
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
