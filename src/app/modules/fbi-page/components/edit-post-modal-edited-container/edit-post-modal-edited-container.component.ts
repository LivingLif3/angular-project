import {ChangeDetectionStrategy, Component, DestroyRef, Inject} from '@angular/core';
import {ChooseElementService} from "../../../../core/services/choose-element.service";
import {FbiService} from "../../../../core/services/fbi.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ICriminalInfo} from "../../../../core/interfaces/criminal-info";

@Component({
  selector: 'app-edit-post-modal-edited-container',
  templateUrl: './edit-post-modal-edited-container.component.html',
  styleUrls: ['./edit-post-modal-edited-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPostModalEditedContainerComponent {

  constructor(
    private chooseElementService: ChooseElementService,
    private fbiService: FbiService,
    private editDialogRef: MatDialogRef<EditPostModalEditedContainerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  edit(editedDataArray: ICriminalInfo[]) {
    let data = {...this.data.criminal, ...editedDataArray[0], added_fields: editedDataArray[1] || null}

    this.fbiService.updateAddedFields(data['@id'], data).subscribe();
    this.editDialogRef.close()
  }
}
