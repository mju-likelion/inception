import { PropsWithChildren } from 'react';
import { theme } from '@/globalStyle';
import { styled, css } from 'styled-components';

interface Props {
  color?: keyof typeof theme.colors;
  align?: string;
}

/** @Note Figma 기준 Typography가 subTitle인 컴포넌트를 다룹니다.  */
export const SubTitle = ({
  color = 'black',
  children,
  align = 'left',
}: PropsWithChildren<Props>) => {
  return (
    <Text color={color} align={align}>
      {children}
    </Text>
  );
};

const Text = styled.p<{
  color: keyof typeof theme.colors;
  align: string;
}>`
  color: ${({ theme, color }) => theme.colors[color] || theme.colors.black};
  ${(props) =>
    css`
      ${({ theme }) => theme.typographies.subTitle};
      letter-spacing: 0;
      text-align: ${props.align};
      word-break: keep-all;
    `}
`;
