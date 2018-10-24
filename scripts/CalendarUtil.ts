import axios from 'axios';
import ical from 'ical';
import { RawCalendarEvent } from './models/CalendarEvent';

export class CalendarUtil {
  public static getEvents = async () => {
    // const apiKey = 'AIzaSyCpuMhikO5zC93UGKm8ZWrnEoG0IbmeWrg';
    // const confirmedCalendarId = '9lki2futg9e5f5sotp1gu09ph87%40group.calendar.google.com';
    // const optionCalendarId = 'n5h5tinp2hratnrjao8gaqom64%40group.calendar.google.com';
    // const url = `https://www.googleapis.com/calendar/v3/calendars/${confirmedCalendarId}/events?key=${apiKey}`
    // await axios.get(url)

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

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (var k in options) {
      if (options.hasOwnProperty(k)) {
        var ev: RawCalendarEvent = options[k];
        console.log(
          'Conference',
          ev.summary,
          'is in',
          ev.location,
          'on the',
          ev.start.getDate(),
          'of',
          months[ev.start.getMonth()]
        );
      }
    }
  };
}
