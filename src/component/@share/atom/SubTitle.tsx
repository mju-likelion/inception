import { PropsWithChildren } from 'react';
import { theme } from '@/globalStyle';
import { styled, css } from 'styled-components';

interface Props {
  ag: string;
  color?: keyof typeof theme.colors;
}

/** @Note Figma 기준 Typography가 subTitle인 컴포넌트를 다룹니다.  */
export const SubTitle = ({
  ag,
  color = 'black',
  children,
}: PropsWithChildren<Props>) => {
  return (
    <Text ag={ag} color={color}>
      {children}
    </Text>
  );
};

const Text = styled.p<{ ag: string; color: keyof typeof theme.colors }>`
  color: ${({ theme, color }) => theme.colors[color] || theme.colors.black};
  ${(props) =>
    props.ag === 'SubTitle' &&
    css`
      ${({ theme }) => theme.typographies.subTitle};
      letter-spacing: 0;
      text-align: left;
    `}
`;
