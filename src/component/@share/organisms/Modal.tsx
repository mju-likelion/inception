import styled from 'styled-components';
import { ButtonLarge } from '@/component/@share/atom';
import { ModalTitleBox } from '../molecules/ModalTitleBox';

interface ModalProps {
  error: 'loginError' | 'codeError' | 'theOtherError';
}

const errorText = [
  {
    errorType: 'loginError',
    title: '존재하지 않는 약속방입니다',
    content: '입장코드를 다시 한번 확인해주세요',
  },
  {
    errorType: 'codeError',
    title: '존재하지 않는 정보입니다',
    content:
      '해당 약속방에서 사용된 닉네임과 비밀번호인지 다시 한번 확인해주세요',
  },
  {
    errorType: 'theOtherError',
    title: '알 수 없는 에러가 발생했어요',
    content: '잠시 후에 다시 시도해주세요',
  },
];

export const Modal = ({ error }: ModalProps) => {
  const onSetModalText = ({ error }: ModalProps) => {
    const result = [];
    const b = errorText.filter((s) => s.errorType === error);

    //에러타입을 키로, 맞는 객체를 찾아와서 배열을 만들어줘
    result.push(<ModalTitleBox title={b[0].title} content={b.content} />);

    return result;
  };
  return (
    <ModalBlock>
      <TopBlock>
        <TitleBoxBlock>{onSetModalText()}</TitleBoxBlock>
      </TopBlock>
      <ButtonBlock>
        <ButtonLarge>확인</ButtonLarge>
      </ButtonBlock>
    </ModalBlock>
  );
};

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
