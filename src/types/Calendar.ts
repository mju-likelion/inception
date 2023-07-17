export interface CalendarData {
  date: string;
  day: string;
  activeStatus: ActiveStatus;
  count?: number;
  selectUsers?: string[];
}

export type ActiveStatus = 'disabled' | 'default' | 'active';

export interface DateRangeLimit {
  start: boolean;
  end: boolean;
}

export type ViewType = 'result' | 'create' | 'select';

export interface PromiseResultData {
  date: string; // '2023-01-11'
  status: ActiveStatus;
  users?: string[]; // ['길동', '사자', '호랑이']
  count?: number; // 3
}
