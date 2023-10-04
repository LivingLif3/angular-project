import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {ChooseElementService} from "../../../../core/services/choose-element.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FbiService} from "../../../../core/services/fbi.service";

@Component({
  selector: 'app-edit-post-modal-original-container',
  templateUrl: './edit-post-modal-original-container.component.html',
  styleUrls: ['./edit-post-modal-original-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

/*
Прокинуть стартовое значение для модалки внутри - this.data.criminal
 */

export class EditPostModalOriginalContainerComponent implements OnInit {

  criminal: any

  constructor(
    private chooseElementService: ChooseElementService,
    private fbiService: FbiService,
    private editDialogRef: MatDialogRef<EditPostModalOriginalContainerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
    this.chooseElementService.criminalData$.subscribe(criminal => {
      this.criminal = criminal
    })
  }

  edit(editedDataArray: any) {
    let data = {...this.criminal, ...editedDataArray[0], added_fields: editedDataArray[1] ? editedDataArray[1] : null}

    this.fbiService.addEditedPost(data)
    this.editDialogRef.close()
  }

}
