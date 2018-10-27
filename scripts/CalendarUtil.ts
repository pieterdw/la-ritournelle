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
        let end = new Date(ev.end);
        if (end.getDay() === 0) {
          // move sunday morning ends to saturday morning, to make it easier to work with
          end.setDate(end.getDate() - 1);
        }
        result.push({
          start: start,
          end: end,
          isConfirmed: isConfirmed
        });
      }
    }
    return result;
  };
}
