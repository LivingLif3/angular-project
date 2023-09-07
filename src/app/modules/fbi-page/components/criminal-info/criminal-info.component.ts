import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-criminal-info',
  templateUrl: './criminal-info.component.html',
  styleUrls: ['./criminal-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CriminalInfoComponent {

  @Input() info!: any

}
