import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { TabBar, TitleBox, Input, ButtonLarge } from '@/component/@uikit';
import { TabItem } from '@/types';
interface Props {
  buttonClick: () => void;
}

export const LoginCodeTemplate = ({ buttonClick }: Props) => {
  const [nicknameValue, setNicknameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const [isButtonInactive, setIsButtonInactive] = useState(true);

  const onChangeNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNicknameValue(event.target.value);
  };
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
  };

  const activeEvent = () => {
    nicknameValue.length >= 1 && passwordValue.length >= 1
      ? setIsButtonInactive(false)
      : setIsButtonInactive(true);
  };

  const activeEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      event.key === 'Enter' &&
      nicknameValue.length >= 1 &&
      passwordValue.length >= 1
    ) {
      event.preventDefault();
      buttonClick();
    }
  };

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

  useEffect(() => {
    activeEvent();
  }, [nicknameValue, passwordValue]);

  return (
    <>
      <TabBar tabItems={tabItems} />
      <WrapContents>
        <WrapUpperContents>
          <TitleBox content="생성한 약속방에서 입력한 닉네임과 비밀번호를 입력해주세요" />

          <WrapInput>
            <Input
              type="text"
              placeholder="닉네임"
              onKeyUp={activeEvent}
              onKeyDown={activeEnter}
              onChange={onChangeNickname}
              value={nicknameValue}
            />
            <Input
              type="password"
              placeholder="비밀번호"
              onKeyUp={activeEvent}
              onKeyDown={activeEnter}
              onChange={onChangePassword}
              value={passwordValue}
            />
          </WrapInput>
        </WrapUpperContents>
        <WrapButton>
          <ButtonLarge isDisabled={isButtonInactive} onClick={buttonClick}>
            완료
          </ButtonLarge>
        </WrapButton>
      </WrapContents>
    </>
  );
};
const WrapContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 30px;

  @media ${({ theme }) => theme.size.tablet} {
    align-items: center;
    margin-top: 60px;
  }
  @media ${({ theme }) => theme.size.web} {
    align-items: center;
    margin-top: 80px;
  }
`;

const WrapUpperContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0px 20px 0px 20px;
`;

const WrapInput = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 24px;
  gap: 8px;

  @media ${({ theme }) => theme.size.tablet} {
    width: 500px;
  }
  @media ${({ theme }) => theme.size.web} {
    margin-top: 40px;
  }
`;

const WrapButton = styled.div`
  display: flex;
  justify-content: center;
  margin: 200px 0px 100px 0px;

  @media ${({ theme }) => theme.size.tablet} {
    margin: 158px 0px 100px 0px;
  }
  @media ${({ theme }) => theme.size.web} {
    margin: 220px 0px 100px 0px;
  }
`;
