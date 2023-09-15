import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {gender} from "../../interfaces/gender";

@Component({
  selector: 'app-gender',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: GenderComponent,
      multi: true
    }]
})



export class GenderComponent implements ControlValueAccessor {

  private gender: gender = gender.MALE

  onChange(value: any) {}

  get value() {
    return this.gender
  }

  @Input()
  set value(value) {
    this.gender = value
    this.onChange(this.gender)
  }

  setMale() {
    this.value = gender.MALE
  }

  setFemale() {
    this.value = gender.Female
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(value: gender): void {
    this.gender = value
  }

}
