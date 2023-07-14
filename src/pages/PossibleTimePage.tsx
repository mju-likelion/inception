import { TimeBox } from '@/component';
import { Information, TitleBox } from '@/component/@share/molecules';
import calendar from '@/assets/images/Calendar.svg';
import { ButtonLarge } from '@/component/@share';
import { styled } from 'styled-components';
import { useState } from 'react';

export const PossibleTimePage = () => {
  const [isActive, setIsActive] = useState(true);

  return (
    <TimePageBlock>
      <ContentBlock>
        <TitleBoxBlock>
          <TitleBox
            content="가용한 날짜들을 선택해주세요"
            $isActive={false}
            $isPass={false}
            defaultColor="gray1"
            step={2}
          />
        </TitleBoxBlock>
        <TimeBox onSetActiveButton={setIsActive} />
        <InformationBlock>
          <Information
            icon={calendar}
            title="선택 가능 시간"
            content="09:00 - 17:00"
          />
        </InformationBlock>
        <ButtonBlock>
          <ButtonLarge isDisabled={isActive}>다음으로</ButtonLarge>
        </ButtonBlock>
      </ContentBlock>
    </TimePageBlock>
  );
};

const TimePageBlock = styled.div`
  margin: auto;
  min-width: 320px;
  max-width: 500px;
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

const InformationBlock = styled.div`
  margin-top: 24px;
  @media ${({ theme }) => theme.size.tablet} {
    margin-top: 40px;
  }
  @media ${({ theme }) => theme.size.web} {
    margin-top: 50px;
  }
`;

const ButtonBlock = styled.div`
  margin: 100px 0;
`;
