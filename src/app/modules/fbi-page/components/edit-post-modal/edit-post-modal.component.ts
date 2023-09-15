import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
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
export class EditPostModalComponent implements OnInit{

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
    public fieldsService: AdditionalFieldsService,
    private fb: FormBuilder,
    private chooseElementService: ChooseElementService,
    private fbiService: FbiService,
    private modalService: ModalService
  ) {
  }

  ngOnInit() {
    console.log("VIEW INIT")
    console.log(this.chooseElementService.criminal)
    this.editFormGroup.patchValue({
      title: this.chooseElementService.criminal.title,
      age_range: this.chooseElementService.criminal.age_range,
      sex: this.chooseElementService.criminal.sex,
      weight: this.chooseElementService.criminal.weight,
      race_raw: this.chooseElementService.criminal.race_raw,
      nationality: this.chooseElementService.criminal.nationality,
      hair_raw: this.chooseElementService.criminal.hair_raw,
      eyes: this.chooseElementService.criminal.eyes,
      reward_text: this.chooseElementService.criminal.reward_text,
      description: this.chooseElementService.criminal.description
    })
  }

  // Нужно здесь заэмитить значение на false
  filterNumericInput(event: any) {
    const filteredValue = event.target.value.replace(/[^0-9]/g, '');
    this.editFormGroup.get('age_range')!.setValue(filteredValue, { emitEvent: false });
  }

  edit() {
    let data = {...this.chooseElementService.criminal, ...this.editFormGroup.value}

    if(Object.keys(this.fieldsService.additionalFields).length) {
      data.added_fields = this.fieldsService.additionalFields
    } else {
      data.added_fields = null
    }

    this.fbiService.addEditedPost(data)
    this.modalService.closeEditModal()
  }
}
