import { ReactComponent as LoadingBgWhiteSVG } from '@/assets/images/LoadingBgWhite.svg';

import { ReactComponent as SpinerMintSVG } from '@/assets/images/SpinerMint.svg';
import styled from 'styled-components';

export const LoadingPage = () => {
  return (
    <>
      <WrapBg>
        <LoadingBgWhite />
      </WrapBg>
      <WrapSpiner>
        <SpinerMint />
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

const SpinerMint = styled(SpinerMintSVG)`
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

const LoadingBgWhite = styled(LoadingBgWhiteSVG)`
  width: 40px;
  height: 40px;
`;
