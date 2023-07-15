import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { CheckBox, Body } from '@/component/@share';

interface TitleCheckProps {
  isChecked: boolean;
  onClick: () => void;
}

export const TitleCheck = ({
  isChecked,
  onClick,
  children,
}: PropsWithChildren<TitleCheckProps>) => {
  return (
    <Container onClick={onClick}>
      <CheckBox isChecked={isChecked} onClick={onClick} />
      <Body ag="Body3" color="gray2">
        {children}
      </Body>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 133px;
  cursor: pointer;
`;
