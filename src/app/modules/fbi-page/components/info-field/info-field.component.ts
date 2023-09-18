import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-info-field',
  templateUrl: './info-field.component.html',
  styleUrls: ['./info-field.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoFieldComponent {
  @Input() key!: any
  @Input() value!: any
}
