import { styled, css } from 'styled-components';

interface Props {
  ag: string;
  text: string;
}

/** @Note Figma 기준 Typography가 Title인 컴포넌트를 다룹니다.  */
export const Title = ({ ag, text }: Props) => {
  return <Text ag={ag}>{text}</Text>;
};

const Text = styled.h1<{ ag: string }>`
  ${(props) =>
    props.ag === 'Title1' &&
    css`
      /* font-family: Pretendard; */
      font-size: 26px;
      font-weight: 700;
      line-height: 28px;
      letter-spacing: 0px;
      text-align: left;
    `}

  ${(props) =>
    props.ag === 'Title2' &&
    css`
      /* font-family: Pretendard; */
      font-size: 20px;
      font-weight: 700;
      line-height: 24px;
      letter-spacing: 0px;
      text-align: left;
    `}
`;
