export class DateUtil {
  public static formatStartEndDates(start: Date, end: Date, locale: string, format?: 'long' | 'short') {
    const startDate = start.getDate(),
      startMonth = start.getMonth(),
      startYear = start.getFullYear(),
      endDate = end.getDate(),
      endMonth = end.getMonth(),
      endYear = end.getFullYear();
    if (startMonth === endMonth && startYear === endYear) {
      return `${startDate} - ${endDate} ${DateUtil.getMonthName(startMonth, locale, format)} ${startYear}`;
    } else if (startYear === endYear) {
      return `${startDate} ${DateUtil.getMonthName(startMonth, locale, format)} - ${endDate} ${DateUtil.getMonthName(
        endMonth,
        locale,
        format
      )} ${startYear}`;
    } else {
      return `${startDate} ${DateUtil.getMonthName(
        startMonth,
        locale,
        format
      )} ${startYear} - ${endDate} ${DateUtil.getMonthName(endMonth, locale, format)} ${endYear}`;
    }
  }

  public static getMonthName = (index: number, locale: string, format?: 'long' | 'short'): string => {
    format = format || 'long';
    const objDate = new Date();
    objDate.setMonth(index);
    let result = objDate.toLocaleString(locale, { month: format });
    result = result.replace('.', '');
    return result;
  };

  public static daysBetween = (date1: Date, date2: Date) => {
    const one_day = 1000 * 60 * 60 * 24,
      date1_ms = date1.getTime(),
      date2_ms = date2.getTime();

    const difference_ms = date2_ms - date1_ms;
    return Math.round(difference_ms / one_day);
  };

  public static dateRangesOverlap = (
    start1: Date | string,
    end1: Date | string,
    start2: Date | string,
    end2: Date | string
  ) => {
    start1 = new Date(start1);
    end1 = new Date(end1);
    start2 = new Date(start2);
    end2 = new Date(end2);
    const maxStart = start1 > start2 ? start1 : start2;
    const minEnd = end1 < end2 ? end1 : end2;
    return maxStart < minEnd;
  };

  public static max = (date1: Date, date2: Date) => {
    return date1 > date2 ? date1 : date2;
  };

  public static min = (date1: Date, date2: Date) => {
    return date1 < date2 ? date1 : date2;
  };
}
