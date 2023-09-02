import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {IUserData} from "../../../../../core/interfaces/user-interface";

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent {

  @Input() userData?: IUserData


}
