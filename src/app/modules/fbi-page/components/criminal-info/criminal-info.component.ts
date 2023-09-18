import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit} from '@angular/core';
import {ICriminalInfo} from "../../../../core/interfaces/criminal-info";

@Component({
  selector: 'app-criminal-info',
  templateUrl: './criminal-info.component.html',
  styleUrls: ['./criminal-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CriminalInfoComponent implements OnInit, OnChanges {

  @Input() info!: ICriminalInfo

  fields!: any

  ngOnInit() {
    this.fields = {
      Age: this.info.age_range,
      Sex: this.info.sex,
      Weight: this.info.weight,
      Race: this.info.race_raw,
      Nationality: this.info.nationality,
      Hair: this.info.hair_raw,
      Reward: this.info.reward_text,
      Description: this.info.description,
    }
  }

  ngOnChanges() {
    this.fields = {
      Age: this.info.age_range,
      Sex: this.info.sex,
      Weight: this.info.weight,
      Race: this.info.race_raw,
      Nationality: this.info.nationality,
      Hair: this.info.hair_raw,
      Reward: this.info.reward_text,
      Description: this.info.description,
    }
  }

}
