import styled from 'styled-components';
import { TabBar } from '@/component/@share/organisms';
import { TitleBox } from '@/component/@share/molecules';
import { Input } from '@/component/@share/atom';
import { ButtonLarge } from '@/component/@share/atom';
import { useState } from 'react';
import { tabState } from '@/store';
import { useRecoilState } from 'recoil';

export const CodeSubmitTemlplate = () => {
  const [value, setValue] = useState('');

  const [buttonActive, setButtonActive] = useState(true);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);

    setValue(event.target.value.toUpperCase()); //입력코드 대문자 변환

    const index = value.length;
    index > 4 ? setButtonActive(false) : setButtonActive(true); //코드자릿수 6자리 제한
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
    <Wrapper>
      <TabBar
        onClick={changeTabBar}
        firstTabTitle={'약속 잡기'}
        secondTabTitle={'결과 보기'}
      />
      <WrapTitleBox>
        <TitleBox
          title={'약속방 들어가기'}
          content={
            '약속 결과를 확인하기 위해 약속방의 입장 코드를 입력해 주세요'
          }
          $isActive={false}
          $isPass={false}
        />
      </WrapTitleBox>
      <WrapInput>
        <Input
          placeholder={'약속방 입력 코드'}
          onChange={onChange}
          value={value}
          maxLength={6}
        />
      </WrapInput>
      <WrapButton>
        <ButtonLarge isDisabled={buttonActive}>입력 완료</ButtonLarge>
      </WrapButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media ${({ theme }) => theme.size.mobile} {
  }
  @media ${({ theme }) => theme.size.tablet} {
  }
  @media ${({ theme }) => theme.size.web} {
  }
`;

const WrapTitleBox = styled.div`
  margin: 30px 90px 24px 20px;
`;

const WrapInput = styled.div`
  display: flex;
  margin: 0px 20px 0px 20px;
  @media ${({ theme }) => theme.size.mobile} {
    margin: 0px 20px 0px 20px;
  }
`;

const WrapButton = styled.div`
  display: flex;
  justify-content: center;
  width: 240px;
  margin: 200px 60px 0px 60px;
`;
