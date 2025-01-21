import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'masquerCodeCarte',
  standalone: true,
})
export class MasquerCodeCartePipe implements PipeTransform {
  transform(value: string): string {
    if (!value || value.length < 4) {
      return value;
    }
    const visiblePart = value.slice(-4);
    const maskedPart = '*'.repeat(value.length - 4);
    return maskedPart + visiblePart;
  }
}