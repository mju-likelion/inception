import { theme } from '@/globalStyle';
import { styled, css } from 'styled-components';

interface Props {
  ag: string;
  color?: keyof typeof theme.colors;
  children: string;
}

/** @Note Figma 기준 Typography가 subTitle인 컴포넌트를 다룹니다.  */
export const SubTitle = ({ ag, color = 'black', children }: Props) => {
  return (
    <Text ag={ag} color={color}>
      {children}
    </Text>
  );
};

const Text = styled.h1<{ ag: string; color: keyof typeof theme.colors }>`
  color: ${({ theme, color }) => theme.colors[color] || theme.colors.black};
  ${(props) =>
    props.ag === 'SubTitle' &&
    css`
      ${({ theme }) => theme.typographies.subTitle};
      letter-spacing: 0;
      text-align: left;
    `}
`;
