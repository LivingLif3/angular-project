import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {AdditionalFieldsService} from "../../../../../core/services/additional-fields.service";

@Component({
  selector: 'app-fbi-card',
  templateUrl: './fbi-card.component.html',
  styleUrls: ['./fbi-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FbiCardComponent {

  @Input() id?: string
  @Input() editStatus?: boolean | undefined = false
  @Input() index!: number;
  @Input() title!: string;
  @Input() img!: string;
  @Input() nationality: string = "unknown";
  @Input() hair!: string;
  @Input() race!: string;
  @Input() description!: string;

  @Input() updateChosenEditedElement!: Function // Сделать через оутпут
  

  @Input() chosenIndex!: number
  @Output() chosenIndexChange = new EventEmitter()

  @Input() edit!: boolean
  @Output() editChange = new EventEmitter()

  @Input() chosenEditedElementId?: string
  @Output() chosenEditedElementIdChange = new EventEmitter()

  @Input() showEditedPosts?: boolean
  @Output() showEditedPostsChange = new EventEmitter()

  constructor(
    private additionalService: AdditionalFieldsService
  ) {
  }

  choose() {
    this.chosenIndexChange.emit(this.index)
    if(this.id && this.editStatus) {
      this.chosenEditedElementIdChange.emit(this.id)
    }
  }

  changePage() {
    if(this.editStatus) {
      this.choose()
      this.updateChosenEditedElement()
      this.showEditedPostsChange.emit(true)
    }
  }

  onEdit() {
    this.additionalService.clearFields()
    this.editChange.emit(true)
  }
}
