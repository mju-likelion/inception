import styled from 'styled-components';
import { Information, TitleBox } from '@/component/@share/molecules';
import { Calendar } from '@/component';
import { TabBar } from '@/component/@share';
import Time from '@/assets/images/Time.svg';
import People from '@/assets/images/People.svg';
import { TabItem } from '@/types';

export const Result = () => {
  const onClick = (tab: string) => {};

  const tabItems: TabItem[] = [
    {
      id: 'default',
      title: '약속 잡기',
    },
    {
      id: 'result',
      title: '결과 보기',
    },
  ];

  return (
    <>
      <TabBar onClick={onClick} tabItems={tabItems} />
      <ResultPageBlock>
        <ContentBlock>
          <TitleBoxBlock>
            <TitleBox
              title="일정들을 모아보니"
              content="링크를 공유한 사람들과 겹치는 가용 날짜에 인원수와 함께 표시됩니다"
            />
          </TitleBoxBlock>
          <CalendarBlock>
            <Calendar viewType="result" />
          </CalendarBlock>
          <InformationBlock>
            <Information
              icon={Time}
              title="겹치는 시간을 확인하려면 날짜를 선택하세요"
              isNull={true}
              isEnabled={false}
            />
            <Information
              icon={People}
              title="제출한 사람"
              content="학수, 원유, 해빈"
            />
            <Information
              title="약속방 링크"
              content="https://www.google.co.kr/afadsfadsfadsfadsf"
              isEnabled={true}
            />
            <Information
              title="약속방 입장 코드"
              content="A1B1C1"
              isEnabled={true}
            />
          </InformationBlock>
        </ContentBlock>
      </ResultPageBlock>
    </>
  );
};

const ResultPageBlock = styled.div`
  min-width: 320px;
  max-width: 540px;
  margin: auto;
`;

const ContentBlock = styled.div`
  text-align: center;
  margin: 0 20px;
`;

const TitleBoxBlock = styled.div`
  margin: 30px 0 12px 0;
  @media ${({ theme }) => theme.size.tablet} {
    margin: 60px 0 24px 0;
  }
  @media ${({ theme }) => theme.size.web} {
    margin-top: 80px;
  }
`;

const CalendarBlock = styled.div`
  margin-bottom: 12px;
  @media ${({ theme }) => theme.size.tablet} {
    margin-bottom: 30px;
  }
`;

const InformationBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 100px;
`;
