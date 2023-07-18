import styled from 'styled-components';
import { ButtonLarge } from '@/component/@share/atom';
import { ProgressBarModal, HelperTitleBox } from '@/component/@share/molecules';

interface HelperModalProps {
  step: 0 | 1 | 2 | 3;
  open: boolean;
  close: () => void;
}

const helpText = [
  {
    title: '약속방을 생성합니다',
    content: '친구들이 날짜를 선택할 수 있는 약속 날짜의 범위를 정해주세요.',
  },
  {
    title: '약속 방에 입장했다면',
    content: '활성화되어있는 부분 중에 가능한 날짜들과 시간을 골라주세요.',
  },
  {
    title: '마지막이에요!',
    content:
      '이번 약속방에서만 사용하실 닉네임과 비밀번호를 입력해 주세요. 이를 통해 수정 및 결과 확인이 가능합니다.',
  },
];

export const HelperModal = ({ step, open, close }: HelperModalProps) => {
  const onSetHelpText = () => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      result.push(
        <HelperTitleBox
          key={i}
          title={helpText[i].title}
          content={helpText[i].content}
          $isActive={step === i + 1}
          $isPass={step > i}
          defaultColor={step === 0 ? 'gray1' : 'gray3'}
        />
      );
    }

    return result;
  };
  return (
    <>
      {open ? (
        <ModalBackdrop onClick={close}>
          <ModalBlock onClick={(e) => e.stopPropagation()}>
            <TopBlock>
              <ProgressBarModal total={3} step={step} />
              <TitleBoxBlock>{onSetHelpText()}</TitleBoxBlock>
            </TopBlock>
            <ButtonBlock>
              <ButtonLarge click={close}>알겠어요</ButtonLarge>
            </ButtonBlock>
          </ModalBlock>
        </ModalBackdrop>
      ) : null}
    </>
  );
};

const ModalBackdrop = styled.div`
  z-index: 1; //위치지정 요소
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(126, 128, 153, 0.2);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(8px);
`;

const ModalBlock = styled.div`
  width: 320px;
  height: 476px;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.12);
`;

const TitleBoxBlock = styled.div`
  display: flex;
  width: 250px;
  height: 318px;
  flex-direction: column;
  align-items: flex-start;
  gap: 42px;
`;

const TopBlock = styled.div`
  display: inline-flex;
  align-items: flex-start;
  gap: 8px;
  margin: 32px 14px 42px 20px;
`;

const ButtonBlock = styled.div`
  text-align: center;
`;
