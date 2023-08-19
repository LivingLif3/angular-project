import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-fbi-card',
  templateUrl: './fbi-card.component.html',
  styleUrls: ['./fbi-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FbiCardComponent {

  @Input() index!: number;
  @Input() title!: string;
  @Input() img!: string;
  @Input() nationality: string = "unknown";
  @Input() hair!: string;
  @Input() race!: string;
  @Input() description!: string;

  @Input() chosenIndex!: number

  @Output() chosenIndexChange = new EventEmitter()

  choose() {
    this.chosenIndexChange.emit(this.index)
  }
}
