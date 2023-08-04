import { useEffect } from 'react';
import { Time } from '@/component/timeBlock/atoms';
import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import { timeListState } from '@/store';

interface TimeListProps {
  start: string;
  end: string;
}

export const TimeList = ({ start, end }: TimeListProps) => {
  const [timeList, setTimeList] = useRecoilState(timeListState);

  useEffect(() => {
    calculateTime();
  }, [start, end]);

  const calculateTime = () => {
    const calculatedTimeLine: Array<string> = [];
    const regex = /[^0-9]/g;
    const startTime = Number(start.replace(regex, ''));
    const endTime = Number(end.replace(regex, ''));

    for (let i = startTime; i < endTime; i += 30) {
      let hour = '';
      let minute = '';

      if (i % 100 === 60) {
        hour = String(Math.floor(i / 100) + 1);
        minute = '00';
        i = Number(hour) * 100 + Number(minute);
      } else {
        hour = String(Math.floor(i / 100));
        minute = i % 100 === 0 ? '00' : '30';
      }
      calculatedTimeLine.push(hour + ':' + minute);
    }
    setTimeList(calculatedTimeLine);
  };

  return (
    <TimeListBlock>
      {timeList.map((time, index) => (
        <Time key={index}>{time}</Time>
      ))}
    </TimeListBlock>
  );
};

const TimeListBlock = styled.div`
  display: flex;
  width: 42px;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
`;
