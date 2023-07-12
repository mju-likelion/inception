export interface CalendarData {
  date: string;
  day: string;
  activeStatus: ActiveStatus;
}

export type ActiveStatus = 'disabled' | 'default' | 'active';

export interface DateRangeError {
  start: boolean;
  end: boolean;
}
