export interface CalendarEvent {
  isConfirmed: boolean;
  start: string;
  end: string;
}

export interface RawCalendarEvent {
  start: string;
  end: string;
  summary: string;
  location: string;
}
