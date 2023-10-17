import {ChangeDetectionStrategy, Component, DestroyRef, Inject, OnInit} from '@angular/core';
import {ChooseElementService} from "../../../../core/services/choose-element.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FbiService} from "../../../../core/services/fbi.service";
import {ICriminalInfo} from "../../../../core/interfaces/criminal-info";

@Component({
  selector: 'app-edit-post-modal-original-container',
  templateUrl: './edit-post-modal-original-container.component.html',
  styleUrls: ['./edit-post-modal-original-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EditPostModalOriginalContainerComponent {
  constructor(
    private chooseElementService: ChooseElementService,
    private fbiService: FbiService,
    private editDialogRef: MatDialogRef<EditPostModalOriginalContainerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  edit(editedDataArray: ICriminalInfo[]) {
    let data = {...this.data.criminal, ...editedDataArray[0], added_fields: editedDataArray[1] || null}

    this.fbiService.addEditedPost(data)
    this.editDialogRef.close()
  }

}
