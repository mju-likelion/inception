import { styled } from 'styled-components';
import { theme } from '@/globalStyle';

interface Props {
  spinnerType?: 'whiteSpinner' | 'mintSpinner' | 'graySpinner';
}

export const LoadingIcon = ({ spinnerType = 'mintSpinner' }: Props) => {
  switch (spinnerType) {
    case 'mintSpinner':
      return (
        <SpinnerIcon backgroundColor={'#E5E5EA'} spinnerColor={'#50E3C0'} />
      );
    case 'whiteSpinner':
      return <SpinnerIcon backgroundColor={'#C1FBED'} spinnerColor={'white'} />;
    case 'graySpinner':
      return (
        <SpinnerIcon
          backgroundColor={theme.colors.gray4}
          spinnerColor={theme.colors.gray3}
        />
      );
    default:
      return <h1>{spinnerType}에 맞는 스피너가 없습니다.</h1>;
  }
};

interface SpinnerIconProps {
  backgroundColor: string;
  spinnerColor: string;
}
const SpinnerIcon = ({ backgroundColor, spinnerColor }: SpinnerIconProps) => {
  return (
    <>
      <WrapBg>
        <SpinnerBackground color={backgroundColor} />
      </WrapBg>
      <WrapSpinner>
        <Spinner color={spinnerColor} />
      </WrapSpinner>
    </>
  );
};

interface SpinnerProps {
  color: string;
}

const Spinner = ({ color }: SpinnerProps) => {
  return (
    <SpinnerBox>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20 6C20.0242 6 20.0483 5.99971 20.0724 5.99914C21.8864 6.00852 23.6816 6.37034 25.358 7.06472C27.0567 7.76834 28.6001 8.79965 29.9002 10.0998C31.2003 11.3999 32.2317 12.9433 32.9353 14.642C33.6297 16.3184 33.9915 18.1136 34.0009 19.9276C34.0003 19.9517 34 19.9758 34 20C34 21.6569 35.3431 23 37 23C38.6569 23 40 21.6569 40 20C40 17.3736 39.4827 14.7728 38.4776 12.3463C37.4725 9.91982 35.9993 7.71504 34.1421 5.85786C32.285 4.00069 30.0802 2.5275 27.6537 1.52241C25.2272 0.517315 22.6264 0 20 0C18.3431 0 17 1.34315 17 3C17 4.65685 18.3431 6 20 6Z"
          fill={color}
        />
      </svg>
    </SpinnerBox>
  );
};

const SpinnerBackground = ({ color }: SpinnerProps) => {
  return (
    <SpinnerBackgroundBox>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M40 20C40 31.0457 31.0457 40 20 40C8.9543 40 0 31.0457 0 20C0 8.9543 8.9543 0 20 0C31.0457 0 40 8.9543 40 20ZM5.99896 20C5.99896 27.7326 12.2674 34.001 20 34.001C27.7326 34.001 34.001 27.7326 34.001 20C34.001 12.2674 27.7326 5.99896 20 5.99896C12.2674 5.99896 5.99896 12.2674 5.99896 20Z"
          fill={color}
        />
      </svg>
    </SpinnerBackgroundBox>
  );
};

const WrapBg = styled.div`
  position: absolute;
`;

const WrapSpinner = styled.div`
  position: relative;
`;

const SpinnerBox = styled.div`
  width: 40px;
  height: 40px;

  animation: rotate 1000ms infinite;
  animation-delay: 1ms;

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const SpinnerBackgroundBox = styled.div`
  width: 40px;
  height: 40px;
`;
