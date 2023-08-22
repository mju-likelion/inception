export interface CalendarData {
  date: string;
  day: string;
  activeStatus: ActiveStatus;
  count?: number;
  selectUsers?: string[];
}

/**
 * @Description
 * `default` = 클릭이 가능하다. create mode에선 클릭 시 active 모드가 된다.
 *
 * `active` = 클릭이 가능하다. create mode에선 클릭 시 default 모드가 된다.
 *
 * `disabled` = 클릭이 불가능하다. Gray4 색상으로 표시된다.
 *  result 모드에선 해당 날짜에 2명 미만 선택 시 비활성화되며 숫자도 표시하지 않는다.
 *  */
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
