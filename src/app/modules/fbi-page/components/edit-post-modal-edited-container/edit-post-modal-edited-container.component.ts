import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {ChooseElementService} from "../../../../core/services/choose-element.service";
import {FbiService} from "../../../../core/services/fbi.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-post-modal-edited-container',
  templateUrl: './edit-post-modal-edited-container.component.html',
  styleUrls: ['./edit-post-modal-edited-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPostModalEditedContainerComponent {

  criminal: any

  constructor(
    private chooseElementService: ChooseElementService,
    private fbiService: FbiService,
    private editDialogRef: MatDialogRef<EditPostModalEditedContainerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
    this.chooseElementService.editedCriminalData$.subscribe(criminal => {
      this.criminal = criminal
    })
  }

  edit(editedDataArray: any) {

    console.log(this.criminal)

    let data = {...this.criminal, ...editedDataArray[0], added_fields: editedDataArray[1] ? editedDataArray[1] : null}

    this.fbiService.updateAddedFields(data['@id'], data).subscribe();
    this.editDialogRef.close()
  }
}
