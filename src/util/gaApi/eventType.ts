export type TBinEvent =
  | {
      eventName: 't_view';
      tEventId: 101;
      tPath: '/create-room';
    }
  | {
      eventName: 't_view';
      tEventId: 102;
      tPath: '/vote-room';
      tStep: 1 | 2 | 3 | null;
    }
  | {
      eventName: 't_view';
      tEventId: 103;
      tPath: '/search-room';
    }
  | {
      eventName: 't_view';
      tEventId: 104;
      tPath: '/room-result';
      tRoomCode: string;
      tCount: number;
    }
  | {
      eventName: 't_click';
      tEventId: 201;
      tPath: '/create-room' | '/vote-room' | '/search-room' | '/room-result';
      tTarget: 'logo';
      // tStep은 tPath가 /vote-room일 때만 존재
      tStep?: 1 | 2 | 3 | null;
    }
  | {
      eventName: 't_click';
      tEventId: 202;
      tPath: '/create-room' | '/vote-room' | '/search-room' | '/room-result';
      tTarget: 'help';
      // tStep은 tPath가 /vote-room일 때만 존재
      tStep?: 1 | 2 | 3 | null;
    }
  | {
      eventName: 't_click';
      tEventId: 203;
      tPath: '/create-room' | '/vote-room' | '/search-room' | '/room-result';
      tTarget: 'contact';
      // tStep은 tPath가 /vote-room일 때만 존재
      tStep?: 1 | 2 | 3 | null;
    }
  | {
      eventName: 't_click';
      tEventId: 204;
      tPath: '/create-room' | '/vote-room' | '/search-room' | '/room-result';
      tTarget: 'email';
      // tStep은 tPath가 /vote-room일 때만 존재
      tStep?: 1 | 2 | 3 | null;
    }
  | {
      eventName: 't_click';
      tEventId: 205;
      tPath: '/create-room' | '/vote-room' | '/search-room' | '/room-result';
      tTarget: 'privacy_policy';
      // tStep은 tPath가 /vote-room일 때만 존재
      tStep?: 1 | 2 | 3 | null;
    }
  | {
      eventName: 't_click';
      tEventId: 206;
      tPath: '/create-room' | '/vote-room' | '/search-room' | '/room-result';
      tTarget: 'terms_of_service';
      // tStep은 tPath가 /vote-room일 때만 존재
      tStep?: 1 | 2 | 3 | null;
    }
  | {
      eventName: 't_click';
      tEventId: 207;
      tPath: '/create-room';
      tTarget: 'move_month';
      tFrom: number;
      tTo: number;
      tDirection: 'prev' | 'next';
    }
  | {
      eventName: 't_click';
      tEventId: 208;
      tPath: '/create-room';
      tTarget: 'calendar_date';
      tDates: string;
    }
  | {
      eventName: 't_click';
      tEventId: 209;
      tPath: '/create-room';
      tTarget: 'time_selector';
      tType: 'start' | 'end';
      tValue: string;
    }
  | {
      eventName: 't_click';
      tEventId: 210;
      tPath: '/create-room';
      tTarget: 'date_only';
      tValue: boolean;
    }
  | {
      eventName: 't_click';
      tEventId: 211;
      tPath: '/create-room';
      tTarget: 'create_room';
    }
  | {
      eventName: 't_click';
      tEventId: 212;
      tPath: '/vote-room';
      tTarget: 'move_month';
      tFrom: number;
      tTo: number;
      tDirection: 'prev' | 'next';
    }
  | {
      eventName: 't_click';
      tEventId: 213;
      tPath: '/vote-room';
      tTarget: 'calendar_date';
      tDates: string;
    }
  | {
      eventName: 't_click';
      tEventId: 214;
      tPath: '/vote-room';
      tTarget: 'move_time_block';
      tPageIndex: number;
      tDirection: 'prev' | 'next';
    }
  | {
      eventName: 't_click';
      tEventId: 221;
      tPath: '/room-result';
      tTarget: 'move_month';
      tFrom: number;
      tTo: number;
      tDirection: 'prev' | 'next';
    }
  | {
      eventName: 't_click';
      tEventId: 222;
      tPath: '/room-result';
      tTarget: 'calendar_date';
      tDate: string;
      tIsEveryoneSelecting: boolean;
    }
  | {
      eventName: 't_click';
      tEventId: 233;
      tPath: '/vote-room';
      tTarget: 'time_block';
      tPageIndex: number;
      tTimes: string;
    };
