import styled from 'styled-components';
import { TabBar } from '@/component/@share/organisms';
import { TitleBox } from '@/component/@share/molecules';
import { Input } from '@/component/@share/atom';
import { ButtonLarge } from '@/component/@share/atom';
import { useState, useEffect } from 'react';
import { tabState } from '@/store';
import { useRecoilState } from 'recoil';

export const LoginMasterTemlplate = () => {
  const [nicknameValue, setNicknameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const [buttonInactive, setButtonInactive] = useState(true);

  const onChangeNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNicknameValue(event.target.value);
    console.log(nicknameValue);
  };
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
    console.log(passwordValue);
  };

  const activeEvent: React.KeyboardEventHandler<HTMLInputElement> = () => {
    const isInactive = nicknameValue.length === 0 || passwordValue.length === 0;
    setButtonInactive(isInactive);
  };

  const [clickTabBar, setClickTabBar] = useRecoilState(tabState);
  const [selectedTab, setSelectedTab] = useState<'default' | 'result'>(
    'default'
  );

  const changeTabBar = (tab: 'default' | 'result') => {
    setSelectedTab(tab);
    setClickTabBar(tab);
  };

  return (
    <>
      <TabBar
        onClick={changeTabBar}
        firstTabTitle={'약속 잡기'}
        secondTabTitle={'결과 보기'}
      />
      <WrapperContents>
        <WrapTitleBoxInput>
          <WrapTitleBox>
            <TitleBox
              total={3}
              step={3}
              title=""
              content={'본인 확인을 위한 임시 닉네임과 비밀번호를 입력해주세요'}
              $isActive={true}
              $isPass={false}
            />
          </WrapTitleBox>
          <NicknameInput>
            <Input
              type={'text'}
              placeholder={'닉네임'}
              onKeyUp={activeEvent}
              onChange={onChangeNickname}
              value={nicknameValue}
            />
          </NicknameInput>
          <PasswordInput>
            <Input
              type={'password'}
              placeholder={'비밀번호'}
              onKeyUp={activeEvent}
              onChange={onChangePassword}
              value={passwordValue}
            />
          </PasswordInput>
        </WrapTitleBoxInput>
        <WrapButton>
          <ButtonLarge isDisabled={buttonInactive}>입력 완료</ButtonLarge>
        </WrapButton>
      </WrapperContents>
    </>
  );
};

const WrapperContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media ${({ theme }) => theme.size.tablet} {
    margin: 60px 167px 0px 167px;
    align-items: center;
  }
`;

const WrapTitleBoxInput = styled.div`
  @media ${({ theme }) => theme.size.tablet} {
  }
`;

const WrapTitleBox = styled.div`
  margin: 30px 90px 24px 20px;
  @media ${({ theme }) => theme.size.tablet} {
    margin: 0px;
  }
`;

const NicknameInput = styled.div`
  display: flex;
  margin: 24px 20px 8px 20px;
  @media ${({ theme }) => theme.size.tablet} {
    margin-top: 40px;
  }
`;
const PasswordInput = styled.div`
  display: flex;
  margin: 0px 20px 0px 20px;
  @media ${({ theme }) => theme.size.tablet} {
    margin-top: 40px;
  }
`;

const WrapButton = styled.div`
  display: flex;
  justify-content: center;
  margin: 200px 75px 100px 75px;
  @media ${({ theme }) => theme.size.mobile} {
  }
  @media ${({ theme }) => theme.size.tablet} {
    margin: 100px 75px 100px 75px;
  }
  @media ${({ theme }) => theme.size.web} {
    margin-top: 312px;
  }
`;
