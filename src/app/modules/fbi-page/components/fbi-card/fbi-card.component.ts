import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {AdditionalFieldsService} from "../../../../../core/services/additional-fields.service";
import {ChooseElementService} from "../../../../../core/services/choose-element.service";
import {FbiService} from "../../../../../core/services/fbi.service";

@Component({
  selector: 'app-fbi-card',
  templateUrl: './fbi-card.component.html',
  styleUrls: ['./fbi-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FbiCardComponent implements OnInit {

  @Input() infoCard: any = {}

  @Input() editStatus?: boolean | undefined = false
  @Input() index!: number;

  @Input() edit!: boolean
  // New fields after refactoring
  @Output() chooseIndex = new EventEmitter<number>()
  @Output() clickEdit = new EventEmitter()

  constructor(
    private additionalService: AdditionalFieldsService,
    private fbiService: FbiService,
    private ref: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    if (!this.edit) {
      let index = this.fbiService.editedPosts.findIndex((criminal: any) => criminal['@id'] === this.infoCard['@id'])
      if (index !== -1) {
        this.editStatus = true
        this.ref.markForCheck()
      }
    }
  }

  choose() {
    this.chooseIndex.emit(this.index)
  }

  onEdit() {
    this.additionalService.clearFields()
    this.clickEdit.emit()
  }
}
