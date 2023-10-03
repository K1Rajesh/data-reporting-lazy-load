import { Pipe, PipeTransform } from '@angular/core';

const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

@Pipe({
  name: 'monthName'
})
export class MonthNamePipe implements PipeTransform {
  transform(monthNumber: number): string {
    if (monthNumber >= 0 && monthNumber <= 11) {
      return months[monthNumber];
    } else {
      return 'Invalid Month';
    }
  }
}
