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

<<<<<<< HEAD
  const [buttonActive, setButtonActive] = useState(true);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setValue(event.target.value.toUpperCase());

    const index = value.length; //코드자릿수 6자리 제한
    console.log(index);
    index > 4 ? setButtonActive(false) : setButtonActive(true);

    console.log(value.toUpperCase()); //코드 대문자로 제한
  };

  const [clickTabBar, setClickTabBar] = useRecoilState(tabState);
  const [selectedTab, setSelectedTab] = useState<'default' | 'result'>(
    'default'
  );

  const changeTabBar = (tab: 'default' | 'result') => {
    console.log(clickTabBar); //2. 어떤 버튼을 클릭했는지 판단해줘(디폴트버튼을 눌렀으면 default,결과버튼을 눌렀으면 result 판단.)
    setSelectedTab(tab); // 그리고 클릭한 버튼에 맞게 atom 의 상태를 바꿔줘};
    setClickTabBar(tab);
  };
=======
  const onChange = (event: any) => {
    setMemo(event.target.value);
  };

  const [clickTabBar, setClickTabBar] = useRecoilState(tabState);
  const [selectedTab, setSelectedTab] = useState<'default' | 'result'>(
    'default'
  );

<<<<<<< HEAD
  const tab = () => {
    console.log(clickTabBar);
    //2. 어떤 버튼을 클릭했는지 판단해줘.
    //디폴트버튼을 눌렀으면 default,결과버튼을 눌렀으면 result 판단.

    setClickTabBar('result');
  }; // 그리고 클릭한 버튼에 맞게 atom 의 상태를 바꿔줘};
>>>>>>> 6e3c9db (feat:  탭바 클릭에 따른 활성화 구현)
=======
  const tab = (tab: 'default' | 'result') => {
    console.log(clickTabBar); //2. 어떤 버튼을 클릭했는지 판단해줘(디폴트버튼을 눌렀으면 default,결과버튼을 눌렀으면 result 판단.)
    setSelectedTab(tab); // 그리고 클릭한 버튼에 맞게 atom 의 상태를 바꿔줘};
    setClickTabBar(tab);
  };
>>>>>>> 46bc8f3 (feat: 탭바 클릭 시 탭 active)

  return (
    <>
      <TabBar
<<<<<<< HEAD
<<<<<<< HEAD
        onClick={changeTabBar} // 1. 버튼을 클릭하면 tab 함수를 실행해죠. 어떤버튼을 클릭하냐에 따라 값이 바뀐 아톰을 줘
=======
        selectedTab={clickTabBar} // 3. 탭바의 어떤버튼을 클릭하냐에 따라 이 selectTab의 값이 바뀌어야 함. 따라서 위에서 바꾼 아톰의 값을 줘
        onClick={tab} // 1. 버튼을 클릭하면 tab 함수를 실행해죠
>>>>>>> 6e3c9db (feat:  탭바 클릭에 따른 활성화 구현)
=======
        onClick={tab} // 1. 버튼을 클릭하면 tab 함수를 실행해죠. 어떤버튼을 클릭하냐에 따라 값이 바뀐 아톰을 줘
>>>>>>> 46bc8f3 (feat: 탭바 클릭 시 탭 active)
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
    </>
  );
};

const WrapTitleBox = styled.div`
  margin: 30px 20px 24px 20px;
`;

const WrapInput = styled.div`
  margin: 0px 20px 0px 20px;
`;

const WrapButton = styled.div`
  margin: 200px 20px 0px 20px;
`;
