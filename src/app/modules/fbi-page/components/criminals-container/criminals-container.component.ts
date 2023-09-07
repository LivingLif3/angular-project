import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-criminals-container',
  templateUrl: './criminals-container.component.html',
  styleUrls: ['./criminals-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CriminalsContainerComponent {

  @Input() loading: boolean = false
  @Input() criminals!: any
  @Input() edit: boolean = false

  @Output() onChoose = new EventEmitter()
  @Output() infoCardChange = new EventEmitter()

  choose() {
    this.onChoose.emit()
  }

  onChangeCard(criminal: any) {
    this.infoCardChange.emit(criminal)
  }


}
