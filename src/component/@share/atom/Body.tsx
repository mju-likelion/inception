import { theme } from '@/globalStyle';
import { css, styled } from 'styled-components';

interface Props {
  ag: string;
  children: React.ReactNode;
  color?: keyof typeof theme.colors;
}

export const Body = ({ ag, children, color = 'black' }: Props) => {
  return (
    <Text ag={ag} color={color}>
      {children}
    </Text>
  );
};

const Text = styled.p<{ ag: string; color: keyof typeof theme.colors }>`
  color: ${({ theme, color }) => theme.colors[color] || theme.colors.black};
  ${({ ag }) =>
    ag === 'Body4' &&
    css`
      ${({ theme }) => theme.typographies.body4};
      letter-spacing: 0px;
      text-align: center;
    `}
`;
