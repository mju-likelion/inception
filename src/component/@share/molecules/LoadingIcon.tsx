import { ReactComponent as LoadingBgMintSVG } from '@/assets/images/LoadingBgMint.svg';
import { ReactComponent as LoadingBgWhiteSVG } from '@/assets/images/LoadingBgWhite.svg';
import { ReactComponent as SpinerWhiteSVG } from '@/assets/images/SpinerWhite.svg';
import { ReactComponent as SpinerMintSVG } from '@/assets/images/SpinerMint.svg';
import styled from 'styled-components';

export const LoadingIcon = () => {
  return (
    <>
      <WrapBg>
        <LoadingBgMint />
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

const LoadingBgMint = styled(LoadingBgMintSVG)`
  width: 500px;
  height: 500px;
`;

const SpinerMint = styled(SpinerMintSVG)`
  width: 500px;
  height: 500px;

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
