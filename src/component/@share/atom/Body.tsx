import { theme } from '@/globalStyle';
import { css, styled } from 'styled-components';

interface Props {
  ag: string;
  children: React.ReactNode;
  color?: keyof typeof theme.colors;
  body1Weight?: 'regular' | 'semiBold';
}

export const Body = ({
  ag,
  children,
  color = 'black',
  body1Weight = 'regular',
}: Props) => {
  return (
    <Text ag={ag} color={color} body1Weight={body1Weight}>
      {children}
    </Text>
  );
};

const Text = styled.p<{
  ag: string;
  color: keyof typeof theme.colors;
  body1Weight: 'regular' | 'semiBold';
}>`
  color: ${({ theme, color }) => theme.colors[color] || theme.colors.black};
  ${({ ag, body1Weight }) =>
    ag === 'Body1' &&
    css`
      ${({ theme }) =>
        body1Weight === 'regular'
          ? theme.typographies.body1.regular
          : theme.typographies.body1.semiBold}
    `}

  ${({ ag }) =>
    ag === 'Body3' &&
    css`
      ${({ theme }) => theme.typographies.body3};
      letter-spacing: 0px;
    `}


  ${({ ag }) =>
    ag === 'Body4' &&
    css`
      ${({ theme }) => theme.typographies.body4};
      letter-spacing: 0px;
      text-align: center;
    `}
`;
