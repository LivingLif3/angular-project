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

@Component({
  selector: 'app-fbi-card',
  templateUrl: './fbi-card.component.html',
  styleUrls: ['./fbi-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FbiCardComponent implements OnInit {

  editDialogRef!: MatDialogRef<EditPostModalComponent>

  @Input() infoCard: any = {}
  @Output() infoCardChange = new EventEmitter()

  @Input() editStatus?: boolean | undefined = false
  @Input() index!: number;

  @Input() edit!: boolean
  // New fields after refactoring
  @Output() clickEdit = new EventEmitter()
  @Output() onChoose = new EventEmitter()

  constructor(
    private additionalService: AdditionalFieldsService,
    private fbiService: FbiService,
    private ref: ChangeDetectorRef,
    private dialog: MatDialog,
    private chooseElementService: ChooseElementService
  ) {
  }

  ngOnInit() {
    // if (!this.edit) {
    //   let index = this.fbiService.editedPosts.findIndex((criminal: any) => criminal['@id'] === this.infoCard['@id'])
    //   if (index !== -1) {
    //     this.editStatus = true
    //     // this.ref.markForCheck()
    //   }
    // }

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
    this.editDialogRef = this.dialog.open(EditPostModalComponent, {
      data: {
        criminal: this.infoCard
      }
    })
  }
}
