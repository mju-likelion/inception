import { PropsWithChildren } from 'react';
import { theme } from '@/globalStyle';
import { styled, css } from 'styled-components';

interface Props {
  ag: string;
  color?: keyof typeof theme.colors;
}

/** @Note Figma 기준 Typography가 Title인 컴포넌트를 다룹니다.  */
export const Title = ({
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

export const Text = styled.h1<{ ag: string; color: keyof typeof theme.colors }>`
  color: ${({ theme, color }) => theme.colors[color] || theme.colors.black};
  ${(props) =>
    props.ag === 'Title1' &&
    css`
      ${({ theme }) => theme.typographies.title1};
      letter-spacing: 0;
      text-align: left;
    `}

  ${(props) =>
    props.ag === 'Title2' &&
    css`
      ${({ theme }) => theme.typographies.title2};
      letter-spacing: 0;
      text-align: left;
    `}
`;
