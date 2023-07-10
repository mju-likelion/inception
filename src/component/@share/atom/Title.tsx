import { PropsWithChildren } from 'react';
import { theme } from '@/globalStyle';
import { styled, css } from 'styled-components';

interface Props {
  ag: 'Title1' | 'Title2' | 'Title3';
  color?: keyof typeof theme.colors;
  align?: string;
}

/** @Note Figma 기준 Typography가 Title인 컴포넌트를 다룹니다.  */
export const Title = ({
  ag,
  color = 'black',
  children,
  align = 'left',
}: PropsWithChildren<Props>) => {
  return (
    <Text ag={ag} color={color} align={align}>
      {children}
    </Text>
  );
};

export const Text = styled.h1<{
  ag: 'Title1' | 'Title2' | 'Title3';
  color: keyof typeof theme.colors;
  align: string;
}>`
  color: ${({ theme, color }) => theme.colors[color] || theme.colors.black};
  ${(props) =>
    props.ag === 'Title1' &&
    css`
      ${({ theme }) => theme.typographies.title1};
      letter-spacing: 0;
      text-align: ${props.align};
      word-break: keep-all;
    `}

  ${(props) =>
    props.ag === 'Title2' &&
    css`
      ${({ theme }) => theme.typographies.title2};
      letter-spacing: 0;
      text-align: ${props.align};
      word-break: keep-all;
    `}

  ${(props) =>
    props.ag === 'Title3' &&
    css`
      ${({ theme }) => theme.typographies.title3};
      letter-spacing: 0;
      text-align: ${props.align};
      word-break: keep-all;
    `}
`;
