import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-criminals-container',
  templateUrl: './criminals-container.component.html',
  styleUrls: ['./criminals-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CriminalsContainerComponent {

  @Input() loading: boolean = false
  @Input() criminalInfo!: any

}
