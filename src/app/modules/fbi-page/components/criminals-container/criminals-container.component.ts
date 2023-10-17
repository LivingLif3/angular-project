import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {ICriminalInfo} from "../../../../core/interfaces/criminal-info";

@Component({
  selector: 'app-criminals-container',
  templateUrl: './criminals-container.component.html',
  styleUrls: ['./criminals-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CriminalsContainerComponent {

  @Input() loading: boolean = false
  @Input() criminals!: Partial<ICriminalInfo>[]
  @Input() edit: boolean = false

}
