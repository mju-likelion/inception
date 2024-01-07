import { TimeBox } from '@/component/TimeBlock/template';
import { Information, TitleBox } from '@/component/@uikit';
import calendar from '@/assets/images/Calendar.svg';
import { ButtonLarge, LoadingIcon } from '@/component/@uikit';
import { styled } from 'styled-components';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { isMouseDownState } from '@/store/atoms';

interface Props {
  buttonClick: () => void;
  startTime: string;
  endTime: string;
  token?: string;
  //한번이라도 제출했으면 로그인 넘어가니까 토탈이 2입니다
}

export const PossibleTimeTemplate = ({
  buttonClick,
  startTime,
  endTime,
  token,
}: Props) => {
  const [isActive, setIsActive] = useState(true);
  const [isMouseDown, setIsMouseDown] = useRecoilState(isMouseDownState);

  const mouseUp = () => {
    setIsMouseDown(false);
  };

  return (
    <TimePageBlock onMouseUp={mouseUp} onTouchEnd={mouseUp}>
      <ContentBlock>
        <TitleBoxBlock>
          <TitleBox
            content="가능한 시간들을 선택해주세요"
            step={2}
            total={token ? 2 : 3}
          />
        </TitleBoxBlock>
        {startTime ? (
          <TimeBox
            onSetActiveButton={setIsActive}
            startTime={startTime}
            endTime={endTime}
          />
        ) : (
          <LoadingIcon />
        )}
        <InformationBlock>
          <Information
            icon={calendar}
            title="선택 가능 시간"
            content={startTime + ' - ' + endTime}
          />
        </InformationBlock>
        <ButtonBlock>
          <ButtonLarge isDisabled={isActive} onClick={buttonClick}>
            {token ? '수정완료' : '다음으로'}
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
  display: flex;
  justify-content: center;
`;
