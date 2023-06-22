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

  ${(props) =>
    props.ag === 'Body1' &&
    css`
      ${({ theme }) => theme.typographies.body1};
      letter-spacing: 0;
      text-align: left;
    `}

  ${(props) =>
    props.ag === 'Body2' &&
    css`
      ${({ theme }) => theme.typographies.body2};
      letter-spacing: 0;
      text-align: left;
    `}
    
  ${(props) =>
    props.ag === 'Body3' &&
    css`
      ${({ theme }) => theme.typographies.body3};
      letter-spacing: 0;
      text-align: left;
    `}

  ${({ ag }) =>
    ag === 'Body4' &&
    css`
      ${({ theme }) => theme.typographies.body4};
      letter-spacing: 0px;
      text-align: center;
    `}

    ${(props) =>
    props.ag === 'Body5' &&
    css`
      ${({ theme }) => theme.typographies.body5};
      letter-spacing: 0;
      text-align: left;
    `}
`;
