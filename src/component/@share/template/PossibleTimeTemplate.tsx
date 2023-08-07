import { TimeBox } from '@/component/timeBlock/template';
import { Information, TitleBox } from '@/component/@share/molecules';
import calendar from '@/assets/images/Calendar.svg';
import { ButtonLarge } from '@/component/@share';
import { styled } from 'styled-components';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { isMouseDownState } from '@/store/atoms';

interface Props {
  buttonClick: () => void;
}

export const PossibleTimeTemplate = ({ buttonClick }: Props) => {
  const [isActive, setIsActive] = useState(true);
  const [isMouseDown, setIsMouseDown] = useRecoilState(isMouseDownState);

  const mouseUp = () => {
    setIsMouseDown(false);
  };

  return (
    <TimePageBlock onMouseUp={mouseUp} onTouchEnd={mouseUp}>
      <ContentBlock>
        <TitleBoxBlock>
          <TitleBox content="가능한 시간들을 선택해주세요" step={2} />
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
          <ButtonLarge isDisabled={isActive} onClick={buttonClick}>
            다음으로
          </ButtonLarge>
        </ButtonBlock>
      </ContentBlock>
    </TimePageBlock>
  );
};

const TimePageBlock = styled.div`
  margin: auto;
  min-width: 320px;
  max-width: 540px;
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
