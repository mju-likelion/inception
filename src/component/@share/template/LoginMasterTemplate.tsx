import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { TitleBox } from '@/component/@share/molecules';
import { Input } from '@/component/@share/atom';
import { ButtonLarge } from '@/component/@share/atom';
import { useState, useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { signUpNickname, signUpPassword } from '@/store/atoms/Login';
import { useGaApi } from '@/hooks/useGA';

interface Props {
  buttonClick: () => void;
  isDateOnly?: boolean;
  token: string;
}

export const LoginMasterTemplate = ({
  buttonClick,
  isDateOnly,
  token,
}: Props) => {
  const [nicknameValue, setNicknameValue] = useRecoilState(signUpNickname);
  const [passwordValue, setPasswordValue] = useRecoilState(signUpPassword);
  const [isButtonInactive, setIsButtonInactive] = useState(true);
  const resetNickname = useResetRecoilState(signUpNickname);
  const resetPassword = useResetRecoilState(signUpPassword);

  const navigate = useNavigate();

  const { gaApi } = useGaApi();

  const onChangeNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNicknameValue(event.target.value);
  };
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
  };

  useEffect(() => {
    activeEvent();
  }, [nicknameValue, passwordValue]);

  useEffect(() => {
    if (token) {
      window.confirm('이미 제출한 기록이 있으므로 결과창으로 이동합니다.') &&
        navigate(1);
    }
    return () => {
      resetNickname();
      resetPassword();
    };
  }, []);

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

  const onClick =
    (
      inputType: 'username' | 'password'
    ): React.MouseEventHandler<HTMLInputElement> =>
    () => {
      gaApi.sendEvent({
        eventName: 't_click',
        tEventId: 217,
        tPath: '/vote-room',
        tTarget: 'input',
        tType: inputType,
      });
    };

  return (
    <WrapContents>
      <WrapUpperContents>
        <TitleBox
          total={isDateOnly ? 2 : 3}
          step={token || isDateOnly ? 2 : 3}
          //토큰이 있거나 날짜만 고르는 경우는 로그인 페이지가 2번째 스텝(물론 둘 다 있을 경우는 1번째 스텝이지만, AppointmentStepPage에서 modifier로직에 따라 step을 2로 고정)
          title=""
          content={'본인 확인을 위한 임시 닉네임과 비밀번호를 입력해주세요'}
        />
        <WrapInput>
          <Input
            type="text"
            placeholder="닉네임"
            onKeyUp={activeEvent}
            onKeyDown={activeEnter}
            onChange={onChangeNickname}
            onClick={onClick('username')}
            value={nicknameValue}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            onKeyUp={activeEvent}
            onKeyDown={activeEnter}
            onChange={onChangePassword}
            onClick={onClick('password')}
            value={passwordValue}
          />
        </WrapInput>
      </WrapUpperContents>
      <WrapButton>
        <ButtonLarge isDisabled={isButtonInactive} onClick={buttonClick}>
          입력 완료
        </ButtonLarge>
      </WrapButton>
    </WrapContents>
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
  }
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
    margin: 158px 0px 100px 0px;
    min-height: calc(100vh - 710px);
  }
  @media ${({ theme }) => theme.size.web} {
    margin: 220px 0px 100px 0px;
    min-height: calc(100vh - 808px);
  }
`;
