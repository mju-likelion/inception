import styled from 'styled-components';
import { ReactComponent as CheckSvg } from '@/assets/images/Check.svg';

interface CheckBoxProp {
  isChecked: boolean;
  onClick: () => void;
}

export const CheckBox = ({ isChecked, onClick }: CheckBoxProp) => {
  return (
    <Container onClick={onClick} isChecked={isChecked}>
      {isChecked && <CheckIcon />}
    </Container>
  );
};

const Container = styled.button<{ isChecked: boolean }>`
  all: unset;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid
    ${({ theme, isChecked }) =>
      isChecked ? theme.colors.gray2 : theme.colors.gray3};
  &:hover {
    border-color: ${({ theme, isChecked }) =>
      isChecked ? theme.colors.gray1 : theme.colors.gray2};
  }
`;

const CheckIcon = styled(CheckSvg)`
  flex-shrink: 0;
  &:hover path {
    fill: ${({ theme }) => theme.colors.gray1};
  }
`;
