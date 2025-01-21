import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round',
  standalone: true
})
export class RoundPipe implements PipeTransform {
  transform(value: number, decimals: number = 2): number {
    if (!value) return 0;
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
  }
}
