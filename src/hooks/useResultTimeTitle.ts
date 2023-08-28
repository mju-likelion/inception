export const useResultTimeTitle = (
  votingUsers: string[],
  onlyDate: boolean,
  enableTimes: {
    [time: string]: number;
  },
  everyoneSelectedTimes?: string[]
) => {
  if (onlyDate) {
    return TITLE['onlyDate'];
  }

  // 시간 디테일 정보를 클릭하지 않았을 때
  if (!everyoneSelectedTimes) {
    if (!votingUsers || votingUsers.length === 0) {
      return TITLE['notVoted'];
    } else if (votingUsers.length === 1) {
      return TITLE['notEnoughVotes'];
    } else {
      const countOfMostSelectedDate = Math.max(...Object.values(enableTimes));
      if (countOfMostSelectedDate < 2) {
        return TITLE['notOverlapDate'];
      }
      return TITLE['notClick'];
    }
  }

  // 시간 디테일 정보를 클릭했을 때
  if (everyoneSelectedTimes) {
    if (everyoneSelectedTimes.length === 0) {
      return TITLE['notOverlapTime'];
    } else {
      return TITLE['click'];
    }
  }

  return TITLE['notClick'];
};

const TITLE = {
  notClick: '겹치는 시간을 확인하려면 날짜를 선택하세요',
  click: '선택한 날짜에서 모두가 겹치는 시간이에요',
  notOverlapTime: '선택한 날짜에서 모두가 겹치는 시간이 없어요',
  notOverlapDate: '겹치는 날짜 및 시간이 없어요',
  onlyDate: '날짜만 조율하는 약속방이에요',
  notEnoughVotes: '아직 겹치는 시간을 확인할 수 없어요',
  notVoted: '제출된 날짜 및 시간이 없어요',
};
