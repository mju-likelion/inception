import styled from 'styled-components';
import { TabBar } from '../organisms';
import { TitleBox } from '../molecules';
import { Input } from '../atom';
import { ButtonLarge } from '../atom';
import { useState } from 'react';

export const CodeCheckPage = () => {
  const onChange = (event: any) => {
    setMemo(event.target.value);
  };

  const onClick = () => {
    console.log('클릭된다!!');
  };

  const [memo, setMemo] = useState('');

  return (
    <>
      <TabBar
        selectedTab={'result'}
        onClick={onClick}
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
      <ButtonLarge>{'입력 완료'}</ButtonLarge>
    </>
  );
};

const WrapTitleBox = styled.div`
  margin: 30px 20px 24px 20px;
`;

const WrapInput = styled.div`
  margin: 0px 20px 0px 20px;
`;
