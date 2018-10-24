export interface CalendarEvent {
  isConfirmed: boolean;
  start: Date;
  end: Date;
}

export interface RawCalendarEvent {
  start: Date;
  end: Date;
  summary: string;
  location: string;
}
