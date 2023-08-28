import { ResultRoomResponse } from '@/util/api';

export const useResultTitle = (votingResult: ResultRoomResponse) => {
  const title = getTitle(votingResult?.votingUsers, votingResult?.enableTimes);
  const subTitle = getSubTitle(
    votingResult?.votingUsers,
    votingResult?.enableTimes
  );

  return { title, subTitle };
};

const getTitle = (
  votingUsers: string[],
  enableTimes: {
    [time: string]: number;
  }
) => {
  if (!votingUsers || votingUsers.length === 0) {
    return TITLE['notVoted'];
  } else if (votingUsers.length === 1) {
    return TITLE['notShared'];
  } else {
    const countOfMostSelectedDate = Math.max(...Object.values(enableTimes));
    return countOfMostSelectedDate < 2 ? TITLE['notOverlap'] : TITLE['default'];
  }
};

const getSubTitle = (
  votingUsers: string[],
  enableTimes: {
    [time: string]: number;
  }
) => {
  if (!votingUsers || votingUsers.length === 0) {
    return SUB_TITLE['notVoted'];
  } else if (votingUsers.length === 1) {
    return SUB_TITLE['notShared'];
  } else {
    const countOfMostSelectedDate = Math.max(...Object.values(enableTimes));
    return countOfMostSelectedDate < 2
      ? SUB_TITLE['notOverlap']
      : SUB_TITLE['default'];
  }
};

const TITLE = {
  default: '일정들을 모아보니',
  notOverlap: '겹치는 날이 없어요',
  notShared: '약속방을 공유해주세요',
  notVoted: '일정이 모이지 않았어요',
};

const SUB_TITLE = {
  default: '링크를 공유한 사람들과 겹치는 가능 날짜에 인원수와 함께 표시됩니다',
  notOverlap: '2명 이상 가능한 날이 없어서 표시할 날짜가 없습니다',
  notShared:
    '약속방 링크를 공유하여 사람들이  함께 모일 수 있는 날짜와 시간을   확인해보세요',
  notVoted: '아무도 일정 제출을 완료하지 않아서 약속 결과를 확인할 수 없어요',
};
