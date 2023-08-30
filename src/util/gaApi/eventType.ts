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
    };
