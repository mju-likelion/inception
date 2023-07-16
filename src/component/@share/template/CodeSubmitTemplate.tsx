import styled from 'styled-components';
import { TabBar } from '@/component/@share/organisms';
import { TitleBox } from '@/component/@share/molecules';
import { Input } from '@/component/@share/atom';
import { ButtonLarge } from '@/component/@share/atom';
import { useEffect, useState } from 'react';
import { TabItems } from '@/types';

export const CodeSubmitTemlplate = () => {
  const [value, setValue] = useState('');

  const [buttonInactive, setButtonInactive] = useState(true);

  const tabItems: TabItems[] = [
    {
      id: 'default',
      title: '약속 잡기',
    },
    {
      id: 'result',
      title: '결과 보기',
    },
  ];

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setValue(event.target.value.toUpperCase()); //입력코드 대문자 변환
  };

  const onKeyUp = () => {
    const index = value.length;
    index > 5 ? setButtonInactive(false) : setButtonInactive(true); //코드자릿수 6자리 제한
  };

  const onClick = () => {};

  useEffect(() => {
    onKeyUp;
    buttonInactive;
  });

  return (
    <>
      <TabBar onClick={onClick} tabItems={tabItems} />
      <WrapperContents>
        <WrapTitleBoxInput>
          <WrapTitleBox>
            <TitleBox
              title={'약속방 들어가기'}
              content={
                '약속 결과를 확인하기 위해 약속방의 입장 코드를 입력해 주세요'
              }
            />
          </WrapTitleBox>
          <WrapInput>
            <Input
              placeholder={'약속방 입력 코드'}
              onChange={onChange}
              onKeyUp={onKeyUp}
              value={value}
              maxLength={6}
            />
          </WrapInput>
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
    margin-top: 60px;
    align-items: center;
  }
`;

const WrapTitleBoxInput = styled.div`
  margin: 0px 20px 0px 20px;
  @media ${({ theme }) => theme.size.tablet} {
    margin: 60px 0px 100px 0px;
  }
`;

const WrapTitleBox = styled.div`
  margin: 30px 0px 24px 0px;
`;

const WrapInput = styled.div`
  display: flex;
  @media ${({ theme }) => theme.size.tablet} {
    margin-top: 40px;
  }
`;

const WrapButton = styled.div`
  display: flex;
  justify-content: center;
  margin: 200px 0px 100px 0px;

  @media ${({ theme }) => theme.size.tablet} {
    margin: 100px 0px 100px 0px;
  }

  @media ${({ theme }) => theme.size.web} {
    margin-top: 312px;
  }
`;
