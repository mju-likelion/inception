import styled from 'styled-components';
import { TabBar } from '@/component/@share/organisms';
import { TitleBox } from '@/component/@share/molecules';
import { Input } from '@/component/@share/atom';
import { ButtonLarge } from '@/component/@share/atom';
import { useEffect, useState } from 'react';
import { TAB_ITEMS } from '@/pages/data';
import { useNavigate } from 'react-router-dom';

export const CodeSubmitPage = () => {
  const [value, setValue] = useState('');

  const [buttonInactive, setButtonInactive] = useState(true);

  const navigate = useNavigate();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setValue(event.target.value.toUpperCase()); //입력코드 대문자 변환
  };

  const onKeyUp = () => {
    const index = value.length;
    index > 5 ? setButtonInactive(false) : setButtonInactive(true); //코드자릿수 6자리 제한
  };

  const onClick = (tab: string) => {
    tab === TAB_ITEMS[0].id && navigate('/');
  };

  const handleButtonClick = () => {
    navigate('/result');
  };

  useEffect(() => {
    onKeyUp;
    buttonInactive;
  });

  return (
    <>
      <TabBar onClick={onClick} tabItems={TAB_ITEMS} />
      <WrapperContents>
        <WrapTitleBoxInput>
          <TitleBox
            title={'약속방 들어가기'}
            content={
              '입장코드를 입력해서 가용 날짜를 선택하거나 다른 사람들이 모일 수 있는 시간을 확인해보세요'
            }
          />

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
          <ButtonLarge isDisabled={buttonInactive} click={handleButtonClick}>
            입력 완료
          </ButtonLarge>
        </WrapButton>
      </WrapperContents>
    </>
  );
};

const WrapperContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 30px;
  @media ${({ theme }) => theme.size.tablet} {
    margin-top: 60px;
    align-items: center;
  }
  @media ${({ theme }) => theme.size.web} {
    margin-top: 80px;
    align-items: center;
  }
`;

const WrapTitleBoxInput = styled.div`
  margin: 0px 20px 0px 20px;
`;

const WrapInput = styled.div`
  display: flex;
  margin-top: 24px;

  @media ${({ theme }) => theme.size.web} {
    margin-top: 40px;
  }
`;

const WrapButton = styled.div`
  display: flex;
  justify-content: center;
  margin: 200px 0px 100px 0px;
  min-height: calc(100vh - 744px);

  @media ${({ theme }) => theme.size.tablet} {
    margin: 100px 0px 100px 0px;
    min-height: calc(100vh - 691px);
  }

  @media ${({ theme }) => theme.size.web} {
    margin-top: 220px;
    min-height: calc(100vh - 847px);
  }
`;
