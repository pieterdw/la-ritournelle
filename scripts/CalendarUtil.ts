import axios from 'axios';
import ical from 'ical';
import { CalendarEvent, RawCalendarEvent } from './models/CalendarEvent';

export class CalendarUtil {
  public static getEvents = async () => {
    const optionsIcal =
      'https://calendar.google.com/calendar/ical/' +
      'n5h5tinp2hratnrjao8gaqom64%40group.calendar.google.com/' +
      'private-45ea0f4c0725b677ea702245f2d7ed87/basic.ics';
    const confirmationsIcal =
      'https://calendar.google.com/calendar/ical/' +
      '9lki2futg9e5f5sotp1gu09ph8%40group.calendar.google.com/' +
      'private-e9d0eb5edd7793f7362c4d5325919a48/basic.ics';

    const concurrent = await axios.all([axios.get(optionsIcal), axios.get(confirmationsIcal)]);

    const options = ical.parseICS(concurrent[0].data);
    const confirmations = ical.parseICS(concurrent[1].data);

    return CalendarUtil.processEvents(options, false).concat(CalendarUtil.processEvents(confirmations, true));
  };

  private static processEvents = (data: any, isConfirmed: boolean): CalendarEvent[] => {
    const result: CalendarEvent[] = [];
    for (var k in data) {
      if (data.hasOwnProperty(k)) {
        var ev: RawCalendarEvent = data[k];
        let start = new Date(ev.start);
        start.setHours((start.getHours() + 24 - start.getUTCHours()) % 24);
        let end = new Date(ev.end);
        end.setHours((start.getHours() + 24 - end.getUTCHours()) % 24);
        if (end.getDay() === 0) {
          // move sunday morning ends to saturday morning, to make it easier to work with
          end.setDate(end.getDate() - 1);
        }

        result.push({
          start: start.toISOString(),
          end: end.toISOString(),
          isConfirmed: isConfirmed
        });
      }
    }
    return result;
  };

  // private static roundDate = (date: Date) => {
  //   if (date.getHours() > 12) {
  //     date.setDate(date.getDate() + 1);
  //   }
  //   date.setHours(0);
  //   date.setMinutes(0);
  //   date.setSeconds(0);
  //   date.setMilliseconds(0);
  //   return date;
  // };
}
