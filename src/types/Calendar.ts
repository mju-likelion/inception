export interface CalendarData {
  date: string;
  day: string;
  activeStatus: ActiveStatus;
}

export type ActiveStatus = 'disabled' | 'default' | 'active';

export interface DateRangeLimit {
  start: boolean;
  end: boolean;
}
