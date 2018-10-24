export interface CalendarEvent {
  isConfirmed: boolean;
  start: Date;
  end: Date;
}

export interface RawCalendarEvent {
  start: string;
  end: string;
  summary: string;
  location: string;
}
