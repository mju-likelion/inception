import { styled } from 'styled-components';
import { ReactComponent as HelperSvg } from '@/assets/images/Helper.svg';

type HelpProp = {
  onClick: () => void;
};

export const Helper = ({ onClick }: HelpProp) => {
  return (
    <>
      <HelperIcon onClick={onClick}>
        <HelperSvg />
      </HelperIcon>
    </>
  );
};

const HelperIcon = styled.button`
  width: 24px;
  height: 24px;
`;
