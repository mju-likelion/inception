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
  };
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
  };

  useEffect(() => {
    activeEvent;
  }, [buttonInactive]);

  const activeEvent = () => {
    nicknameValue.length >= 1 && passwordValue.length >= 1
      ? setButtonInactive(false)
      : setButtonInactive(true);

    console.log(buttonInactive);
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
      <WrapContents>
        <WrapUpperContents>
          <TitleBox
            total={3}
            step={3}
            title=""
            content={'본인 확인을 위한 임시 닉네임과 비밀번호를 입력해주세요'}
          />
          <WrapInput>
            <Input
              type={'text'}
              placeholder={'닉네임'}
              onKeyUp={activeEvent}
              onChange={onChangeNickname}
              value={nicknameValue}
            />
            <Input
              type={'password'}
              placeholder={'비밀번호'}
              onKeyUp={activeEvent}
              onChange={onChangePassword}
              value={passwordValue}
            />
          </WrapInput>
        </WrapUpperContents>
        <WrapButton>
          <ButtonLarge isDisabled={buttonInactive}>입력 완료</ButtonLarge>
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

const WrapInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 24px;
  gap: 8px;

  @media ${({ theme }) => theme.size.tablet} {
    width: 500px;
    margin-top: 40px;
  }
  @media ${({ theme }) => theme.size.web} {
    margin-top: 50px;
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
    margin: 270px 0px 200px 0px;
  }
`;
