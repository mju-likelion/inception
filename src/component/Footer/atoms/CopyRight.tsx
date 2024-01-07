import { styled } from 'styled-components';
import { theme } from '@/globalStyle';

interface CopyRightProps {
  content: string;
}

export const CopyRight = ({ content }: CopyRightProps) => {
  return <Body $color="gray3">{content}</Body>;
};

const Body = styled.p<{ $color: keyof typeof theme.colors }>`
  color: ${({ theme, $color }) => theme.colors[$color] || theme.colors.black};
  ${({ theme }) => theme.typographies.body5};
  letter-spacing: 0;
  text-align: left;
  word-break: keep-all;
`;
