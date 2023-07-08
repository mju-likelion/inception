import styled from 'styled-components';
import { TabBar } from '@/component/@share/organisms';
import { TitleBox } from '@/component/@share/molecules';
import { Input } from '@/component/@share/atom';
import { ButtonLarge } from '@/component/@share/atom';
import { useState } from 'react';
import { tabState } from '@/store';
import { useRecoilState } from 'recoil';

export const CodeSubmitTemlplate = () => {
  const [memo, setMemo] = useState('');

  const [buttonActive, setButtonActive] = useState(true);

  const onChange = (event: any) => {
    setMemo(event.target.value);

    checkCodeEnter;
    const index = memo.length;
    console.log(index);

    function checkCodeEnter(index: number) {
      // inputValue index가 5가 되면 세터함수 실행

      if ((index = 5)) {
        setButtonActive(false);
      } else {
        setButtonActive(true);
      }
    }
  };

  const [clickTabBar, setClickTabBar] = useRecoilState(tabState);
  const [selectedTab, setSelectedTab] = useState<'default' | 'result'>(
    'default'
  );

  const tab = (tab: 'default' | 'result') => {
    console.log(clickTabBar); //2. 어떤 버튼을 클릭했는지 판단해줘(디폴트버튼을 눌렀으면 default,결과버튼을 눌렀으면 result 판단.)
    setSelectedTab(tab); // 그리고 클릭한 버튼에 맞게 atom 의 상태를 바꿔줘};
    setClickTabBar(tab);
  };

  return (
    <>
      <TabBar
        onClick={tab} // 1. 버튼을 클릭하면 tab 함수를 실행해죠. 어떤버튼을 클릭하냐에 따라 값이 바뀐 아톰을 줘
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
        <Input text={'약속방 입력 코드'} onChange={onChange} memo={memo} />
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
