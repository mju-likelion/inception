import styled from 'styled-components';
import { ReactComponent as DropDownSvg } from '@/assets/images/DropDown.svg';

export const DropDownButton = () => {
  return <DropDown />;
};

const DropDown = styled(DropDownSvg)`
  width: 24px;
  height: 24px;
`;
