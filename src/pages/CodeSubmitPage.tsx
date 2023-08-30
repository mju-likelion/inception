import styled from 'styled-components';
import { TabBar } from '@/component/@share/organisms';
import { TitleBox } from '@/component/@share/molecules';
import { Input } from '@/component/@share/atom';
import { ButtonLarge } from '@/component/@share/atom';
import { useState } from 'react';
import { TAB_ITEMS } from '@/pages/data';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@/component/@share/organisms/Modal';
import { resultRoom } from '@/util/api';

export const CodeSubmitPage = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [buttonInactive, setButtonInactive] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const code = event.target.value.toUpperCase();
    code.length > 5 ? setButtonInactive(false) : setButtonInactive(true); //코드자릿수 6자리 제한
    setCode(event.target.value.toUpperCase()); //입력코드 대문자 변환
  };

  // const validateCode = () => {
  //   code.length > 5 ? setButtonInactive(false) : setButtonInactive(true); //코드자릿수 6자리 제한
  // };

  const onClick = (tab: string) => {
    tab === TAB_ITEMS[0].id && navigate('/');
  };

  const activeEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleButtonClick();
    }
  };

  const handleButtonClick = async () => {
    // api 요청
    const res = await resultRoom({ id: code });
    if (!res) {
      setModalOpen(true);
    } else {
      navigate(`/result?code=${code}`);
    }
  };

  return (
    <>
      <TabBar onClick={onClick} tabItems={TAB_ITEMS} />
      <WrapperContents>
        <WrapTitleBoxInput>
          <TitleBox
            title={'약속방 들어가기'}
            content={
              '입장코드를 입력해서 가능 날짜를 선택하거나 다른 사람들이 모일 수 있는 시간을 확인해보세요'
            }
          />

          <WrapInput>
            <Input
              placeholder={'약속방 입력 코드'}
              onChange={onChange}
              /** @TODO keyUp과 keyDown을 구분할 필요가 있을지 */
              // onKeyUp={validateCode}
              onKeyDown={activeEnter}
              value={code}
              maxLength={6}
            />
          </WrapInput>
        </WrapTitleBoxInput>
        <WrapButton>
          <ButtonLarge isDisabled={buttonInactive} onClick={handleButtonClick}>
            입력 완료
          </ButtonLarge>
        </WrapButton>
      </WrapperContents>
      <Modal
        error="codeError"
        isOpen={modalOpen}
        onCloseModal={() => setModalOpen(false)}
      />
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

const WrapInput = styled.form`
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
  //푸터고정 = calc (뷰크기(vh) - (헤더를 제외한 내부콘텐츠 및 마진 + 푸터))
  min-height: calc(100vh - 744px);

  @media ${({ theme }) => theme.size.tablet} {
    margin: 100px 0px;
    min-height: calc(100vh - 691px);
  }

  @media ${({ theme }) => theme.size.web} {
    margin-top: 220px;
    min-height: calc(100vh - 847px);
  }
`;
