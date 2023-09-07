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
import {FbiService} from "../../../../../core/services/fbi.service";
import {ModalService} from "../../../../../core/services/modal.service";

@Component({
  selector: 'app-fbi-card',
  templateUrl: './fbi-card.component.html',
  styleUrls: ['./fbi-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FbiCardComponent implements OnInit {

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
    private modalService: ModalService
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
    this.infoCardChange.emit(this.infoCard)
    this.onChoose.emit()
  }

  onEdit() {
    this.modalService.openEditModal()
  }
}
