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
    };