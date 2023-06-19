import { styled, css } from 'styled-components';

interface Props {
  ag: string;
  text: string;
  color?: 'mint1' | 'gray3' | 'gray1' | 'black'; // string대신 리터럴 타입으로 명확히해주고 싶었는데 이게 더 확장성면에서 별로일까용,,?
}

/** @Note Figma 기준 Typography가 Title인 컴포넌트를 다룹니다.  */
export const Title = ({ ag, text, color }: Props) => {
  return (
    <Text ag={ag} color={color}>
      {text}
    </Text>
  );
};

const Text = styled.h1<{
  ag: string;
  color?: 'mint1' | 'gray3' | 'gray1' | 'black';
}>`
  color: ${({ theme, color = 'black' }) => theme.colors[color]};

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
