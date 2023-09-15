import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ICriminalInfo} from "../../../../core/interfaces/criminal-info";

@Component({
  selector: 'app-criminal-info',
  templateUrl: './criminal-info.component.html',
  styleUrls: ['./criminal-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CriminalInfoComponent {

  @Input() info!: ICriminalInfo

}
