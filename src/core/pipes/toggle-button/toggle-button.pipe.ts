import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toggleButton'
})
export class ToggleButtonPipe implements PipeTransform {

  transform(condition: boolean, value: string, elseValue: string): string {
    if(condition) {
      return value
    } else {
      return elseValue
    }
  }

}
