import styled from 'styled-components';
import { TitleBox } from '@/component/@share/molecules';
import { Calendar } from '@/component';

export const Result = () => {
  return (
    <>
      <TitleBox
        title="일정들을 모아보니"
        content="링크를 공유한 사람들과 겹치는 가용 날짜에 인원수와 함께 표시됩니다"
      />
      <Calendar viewType="result" />
    </>
  );
};
