import { ReactComponent as LoadingBgMintSVG } from '@/assets/images/LoadingBgMint.svg';
import { ReactComponent as SpinerWhiteSVG } from '@/assets/images/SpinerWhite.svg';
import styled from 'styled-components';

export const LoadingLargeButton = () => {
  return (
    <>
      <WrapBg>
        <LoadingBgMint />
      </WrapBg>
      <WrapSpiner>
        <SpinerWhite />
      </WrapSpiner>
    </>
  );
};

const WrapBg = styled.div`
  position: absolute;
`;

const WrapSpiner = styled.div`
  position: relative;
`;

const SpinerWhite = styled(SpinerWhiteSVG)`
  width: 40px;
  height: 40px;

  animation: rotate 3s infinite;
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingBgMint = styled(LoadingBgMintSVG)`
  width: 40px;
  height: 40px;
`;
