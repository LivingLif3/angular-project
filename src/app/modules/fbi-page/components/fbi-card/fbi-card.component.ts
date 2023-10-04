import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {AdditionalFieldsService} from "../../../../core/services/additional-fields.service";
import {FbiService} from "../../../../core/services/fbi.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EditPostModalComponent} from "../edit-post-modal/edit-post-modal.component";
import {first} from "rxjs";
import {ChooseElementService} from "../../../../core/services/choose-element.service";
import {
  EditPostModalOriginalContainerComponent
} from "../edit-post-modal-original-container/edit-post-modal-original-container.component";
import {
  EditPostModalEditedContainerComponent
} from "../edit-post-modal-edited-container/edit-post-modal-edited-container.component";

@Component({
  selector: 'app-fbi-card',
  templateUrl: './fbi-card.component.html',
  styleUrls: ['./fbi-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FbiCardComponent implements OnInit {

  editDialogRef!: MatDialogRef<EditPostModalOriginalContainerComponent | EditPostModalEditedContainerComponent>

  @Input() infoCard: any = {}

  editStatus?: boolean | undefined = false
  @Input() index!: number;

  @Input() edit!: boolean

  constructor(
    private additionalService: AdditionalFieldsService,
    private fbiService: FbiService,
    private ref: ChangeDetectorRef,
    private dialog: MatDialog,
    private chooseElementService: ChooseElementService
  ) {
  }

  ngOnInit() {
    if(!this.edit) {
      this.fbiService.getEditPostById(this.infoCard['@id']).pipe(first()).subscribe((postInfo: any) => {
        if(postInfo) {
          this.editStatus = true
          this.ref.markForCheck()
        }
      })
    }
  }

  choose() {
    this.chooseData(this.infoCard)
  }

  chooseData(criminal: any) {
    if(this.chooseElementService.checkElementBelongsToEdited(criminal)) {
      this.chooseElementService.editedCriminalData$.next(criminal)
    }
    this.chooseElementService.criminalData$.next(criminal)
  }

  onEdit() {
    this.choose()
    this.additionalService.clearFields()
    if(!this.edit) {
      this.editDialogRef = this.dialog.open(EditPostModalOriginalContainerComponent, {
        data: {
          criminal: this.infoCard
        }
      })
    } else {
      this.editDialogRef = this.dialog.open(EditPostModalEditedContainerComponent, {
        data: {
          criminal: this.infoCard
        }
      })
    }
  }
}
