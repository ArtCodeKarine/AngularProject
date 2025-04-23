import { Injectable } from '@angular/core';
import { Periode } from '@shared/utils-data';
import { format, lastDayOfMonth, startOfMonth } from 'date-fns';

export const DATE_FORMAT = 'yyyy-MM-dd';

@Injectable({
  providedIn: 'root',
})
export class DateUtilityService {
  getTodayDate(): Date {
    return new Date();
  }

  getCurrentMonthPeriod(): Periode {
    const date = this.getTodayDate();
    return this.convertToMonthPeriod(date);
  }

  getPreviousMonthPeriod(date: Date): Periode {
    const previousMonth = new Date(date.setMonth(date.getMonth() - 1));
    return this.convertToMonthPeriod(previousMonth);
  }

  getNextMonthPeriod(date: Date): Periode {
    const previousMonth = new Date(date.setMonth(date.getMonth() + 1));
    return this.convertToMonthPeriod(previousMonth);
  }

  convertToMonthPeriod(date: Date): Periode {
    return { debut: startOfMonth(date), fin: lastDayOfMonth(date) };
  }

  formatDateToString(date: Date): string {
    return format(date, DATE_FORMAT);
  }
}
