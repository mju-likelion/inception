import styled from 'styled-components';
import { ReactComponent as LogoSvg } from '@/assets/images/Logo.svg';

interface LogoProps {
  onClick: () => void;
}

export const Logo = ({ onClick }: LogoProps) => {
  return <LogoBox onClick={onClick} />;
};

const LogoBox = styled(LogoSvg)`
  cursor: pointer;
`;
