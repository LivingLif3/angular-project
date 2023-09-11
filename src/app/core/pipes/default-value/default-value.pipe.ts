import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultValue'
})
export class DefaultValuePipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    return !value ? 'unknown' : value
  }

}
