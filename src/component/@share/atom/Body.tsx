import { PropsWithChildren } from 'react';
import { theme } from '@/globalStyle';
import { css, styled } from 'styled-components';

interface Props {
  ag:
    | 'Body1Regular'
    | 'Body1SemiBold'
    | 'Body2Regular'
    | 'Body2SemiBold'
    | 'Body3'
    | 'Body4'
    | 'Body5';
  color?: keyof typeof theme.colors;
  align?: string;
}

export const Body = ({
  ag,
  children,
  color = 'black',
  align = 'left',
}: PropsWithChildren<Props>) => {
  return (
    <Text ag={ag} color={color} align={align}>
      {children}
    </Text>
  );
};

const Text = styled.p<{
  ag:
    | 'Body1Regular'
    | 'Body1SemiBold'
    | 'Body2Regular'
    | 'Body2SemiBold'
    | 'Body3'
    | 'Body4'
    | 'Body5';
  color: keyof typeof theme.colors;
  align: string;
}>`
  color: ${({ theme, color }) => theme.colors[color] || theme.colors.black};

  ${(props) =>
    props.ag === 'Body1Regular' &&
    css`
      ${({ theme }) => theme.typographies.body1.regular};
      letter-spacing: 0;
      text-align: ${props.align};
    `}

  ${(props) =>
    props.ag === 'Body1SemiBold' &&
    css`
      ${({ theme }) => theme.typographies.body1.semiBold};
      letter-spacing: 0;
      text-align: ${props.align};
    `}
    
  ${(props) =>
    props.ag === 'Body2Regular' &&
    css`
      ${({ theme }) => theme.typographies.body2.regular};
      letter-spacing: 0;
      text-align: ${props.align};
    `}
  
  ${(props) =>
    props.ag === 'Body2SemiBold' &&
    css`
      ${({ theme }) => theme.typographies.body2.semiBold};
      letter-spacing: 0;
      text-align: ${props.align};
    `}

  ${(props) =>
    props.ag === 'Body3' &&
    css`
      ${({ theme }) => theme.typographies.body3};
      letter-spacing: 0;
      text-align: ${props.align};
    `}

  ${(props) =>
    props.ag === 'Body4' &&
    css`
      /* font-family: Pretendard; */
      font-size: 12px;
      font-weight: 600;
      line-height: 16px;
      ${({ theme }) => theme.typographies.body4};
      letter-spacing: 0px;
      text-align: ${props.align};
    `}
    
    ${(props) =>
    props.ag === 'Body5' &&
    css`
      ${({ theme }) => theme.typographies.body5};
      letter-spacing: 0;
      text-align: ${props.align};
    `}
`;
