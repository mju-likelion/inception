import { theme } from '@/globalStyle';
import { styled, css } from 'styled-components';

interface Props {
  ag: string;
  text: string;
  color?: keyof typeof theme.colors;
}

/** @Note Figma 기준 Typography가 Title인 컴포넌트를 다룹니다.  */
export const Title = ({ ag, text, color = 'black' }: Props) => {
  return (
    <Text ag={ag} color={color}>
      {text}
    </Text>
  );
};

export const Text = styled.h1<{ ag: string; color: keyof typeof theme.colors }>`
  color: ${({ theme, color }) => theme.colors[color] || theme.colors.black};
  ${(props) =>
    props.ag === 'Title1' &&
    css`
      /* font-family: Pretendard; */
      font-size: 26px;
      font-weight: 700;
      line-height: 28px;
      letter-spacing: 0;
      text-align: left;
    `}

  ${(props) =>
    props.ag === 'Title2' &&
    css`
      /* font-family: Pretendard; */
      font-size: 20px;
      font-weight: 700;
      line-height: 24px;
      letter-spacing: 0;
      text-align: left;
    `}
`;
