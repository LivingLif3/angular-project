import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {AdditionalFieldsService} from "../../../../../core/services/additional-fields.service";

@Component({
  selector: 'app-edit-post-modal',
  templateUrl: './edit-post-modal.component.html',
  styleUrls: ['./edit-post-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPostModalComponent {

  @Input() editFormGroup!: FormGroup

  @Output() editClickChange = new EventEmitter()

  additionalFieldInfo = {
    key: "",
    value: "",
    type: "string"
  }

  constructor(
    public fieldsService: AdditionalFieldsService
  ) {
  }
  // Нужно здесь заэмитить значение на false
  filterNumericInput(event: any) {
    const filteredValue = event.target.value.replace(/[^0-9]/g, '');
    this.editFormGroup.get('age_range')!.setValue(filteredValue, { emitEvent: false });
  }

  onClick() {
    this.editClickChange.emit()
  }
}
