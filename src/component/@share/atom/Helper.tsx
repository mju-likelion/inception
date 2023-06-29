import styled from 'styled-components';
import { ReactComponent as HelperSvg } from '@/assets/images/Helper.svg';

export const Helper = () => {
  return (
    <HelperIcon>
      <HelperSvg />
    </HelperIcon>
  );
};

const HelperIcon = styled.button`
  width: 24px;
  height: 24px;
`;
