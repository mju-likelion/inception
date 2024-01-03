import { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { CheckBox } from '@/component/uikit';
import { theme } from '@/globalStyle';

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
      <CheckBox isChecked={isChecked} />
      <Body $color="gray2">{children}</Body>
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

const Body = styled.p<{ $color: keyof typeof theme.colors }>`
  color: ${({ theme, $color }) => theme.colors[$color] || theme.colors.black};
  ${({ theme }) => theme.typographies.body3};
  letter-spacing: 0;
  text-align: left;
  word-break: keep-all;
`;
